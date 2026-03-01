import type { HasId } from "../../index.js";
import type { Stage } from "./builder.js"; // wherever your Stage type lives

type Row<T extends HasId> = Pick<T, "id"> & Partial<Omit<T, "id">>;

type ManyApi<T extends HasId> = Stage<T, Pick<T, "id">, "id"> & {
  /** Merge into every item (id never touched). */
  defaults(patch: Partial<Omit<T, "id">>): ManyApi<T>;
  /** Per-row computed patch. */
  each(fn: (row: Row<T>) => Partial<Omit<T, "id">>): ManyApi<T>;
};

export function defineRegistry<T extends HasId>(single: (id: T["id"]) => Stage<T, Pick<T, "id">, "id">) {
  const many = (rows: Array<Row<T>>): ManyApi<T> => {
    // store per-row state objects (seeded with id + provided fields)
    const states: Array<Partial<T> & Pick<T, "id">> = rows.map(r => ({ ...r }) as any);

    let shared: Partial<Omit<T, "id">> = {};
    const eachFns: Array<(row: Row<T>) => Partial<Omit<T, "id">>> = [];

    // Proxy surface: same staged setters, applied to all states
    const surface: Record<string, unknown> = {};
    const p = new Proxy(surface, {
      get(_target, prop: string | symbol): unknown {
        if (prop === "defaults") {
          return (patch: Partial<Omit<T, "id">>) => {
            shared = { ...shared, ...patch };
            return p;
          };
        }

        if (prop === "each") {
          return (fn: (row: Row<T>) => Partial<Omit<T, "id">>) => {
            eachFns.push(fn);
            return p;
          };
        }

        if (prop === "build") {
          return () => {
            for (const s of states) {
              const row = s as Row<T>;
              const computed = Object.assign({}, ...eachFns.map(f => f(row)));

              // precedence: defaults < computed < row(seed) < staged setters already applied on s
              const finalCfg = { ...shared, ...computed, ...s } as T;

              // run the *existing* single builder against final cfg:
              // call single(id) to get a stage, then set remaining keys and build.
              //
              // We can skip the type-state chain at runtime and just apply properties:
              const stage = single(finalCfg.id) as unknown as Record<string, any>;
              for (const [k, v] of Object.entries(finalCfg)) {
                if (k === "id") continue;
                const setter = stage[k];
                if (typeof setter === "function") setter(v);
              }
              stage.build?.();
            }
          };
        }

        if (typeof prop !== "string") return undefined;

        // staged setters: apply to all states
        return (value: unknown) => {
          for (const s of states) (s as Record<string, unknown>)[prop] = value;
          return p;
        };
      }
    });

    return p as unknown as ManyApi<T>;
  };

  // return a callable that is also an object with .many
  return Object.assign(single, { many });
}
