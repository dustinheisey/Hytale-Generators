import type { Builder, HasId } from "../../index.js";
import { builderWithDefaults } from "../../index.js";

/** One entry in a builder group. */
export type GroupType<C extends HasId, Id extends string = string> = Readonly<{
  id: Id;
  defaults: Partial<C>;
}>;

/** Base defaults applied to every spec (excluding `id`, since builders seed it). */
export type Defaults<C extends HasId> = Partial<Omit<C, "id">>;

type SpecIds<Specs extends readonly { id: string }[]> = Specs[number]["id"];

/** The returned object shape: lowercase keys → id-seeded staged builders. */
export type BuilderGroup<C extends HasId, Specs extends readonly { id: string }[]> = {
  [K in Lowercase<SpecIds<Specs>>]: Builder<C>;
};

function fromEntriesTyped<K extends PropertyKey, V>(entries: readonly (readonly [K, V])[]): Record<K, V> {
  // Object.fromEntries is typed loosely; keep the cast here.
  return Object.fromEntries(entries as unknown as Iterable<readonly [K, V]>) as Record<K, V>;
}

/**
 * Create a group factory for a config type `C`.
 *
 * Usage:
 *   const makeIngredients = group<IngredientCfg>();
 *   export const ingredients = makeIngredients(defaultSpecs, build, baseDefaults);
 *
 * Then:
 *   ingredients()              // uses default specs
 *   ingredients(customSpecs)   // uses custom specs
 */
export function group<C extends HasId>() {
  return function defineGroup<const DefaultSpecs extends readonly GroupType<C>[]>(
    defaultSpecs: DefaultSpecs,
    build: (cfg: C, spec: DefaultSpecs[number]) => void,
    defaults: Defaults<C> = {} as Defaults<C>
  ) {
    // overloads for good autocomplete
    function make(): BuilderGroup<C, DefaultSpecs>;
    function make<const Specs extends readonly GroupType<C>[]>(
      specs: Specs,
      buildOverride?: (cfg: C, spec: Specs[number]) => void
    ): BuilderGroup<C, Specs>;

    function make<const Specs extends readonly GroupType<C>[]>(
      specs?: Specs,
      buildOverride?: (cfg: C, spec: Specs[number]) => void
    ) {
      const useSpecs = (specs ?? defaultSpecs) as unknown as Specs;
      const useBuild = (buildOverride ?? build) as unknown as (cfg: C, spec: Specs[number]) => void;

      return fromEntriesTyped(
        useSpecs.map(spec => {
          const key = spec.id.toLowerCase() as Lowercase<typeof spec.id>;
          const seeded = { ...defaults, ...spec.defaults } as Partial<C>;

          return [
            key,
            builderWithDefaults<C>(cfg => {
              useBuild(cfg, spec);
            }, seeded)
          ] as const;
        })
      ) as BuilderGroup<C, Specs>;
    }

    return make;
  };
}
