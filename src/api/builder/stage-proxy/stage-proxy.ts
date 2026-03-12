import { type Stage } from "#hg";

export type ProxyOptions = {
  /** Called when build() is invoked */
  onBuild: () => Record<string, unknown>;
  /** Called for any setter write: foo(value) */
  onSet: (prop: string, value: unknown) => void;
  /** Keys that should not be settable at runtime (e.g. "id") */
  hiddenKeys?: readonly string[];
  /** Compound setters that set multiple properties at once, chainable like regular setters */
  setters?: Record<string, (...args: unknown[]) => void>;
};

export function createStageProxy<
  T extends object,
  S extends object = Record<never, never>,
  Hidden extends PropertyKey = never
>(opts: ProxyOptions): Stage<T, S, Hidden> {
  const hiddenKeys = new Set(opts.hiddenKeys ?? []);
  const setters = opts.setters ?? {};

  const proxy = new Proxy(
    {},
    {
      get(_, prop: string | symbol): unknown {
        if (typeof prop !== "string" || hiddenKeys.has(prop)) return undefined;

        if (prop in setters) {
          const fn = setters[prop];
          return (...args: unknown[]) => {
            if (fn) fn(...args);
            return proxy;
          };
        }

        if (prop === "build")
          return () => {
            return opts.onBuild();
          };

        return (value: unknown) => {
          opts.onSet(prop, value);
          return proxy;
        };
      }
    }
  );

  return proxy as unknown as Stage<T, S, Hidden>;
}
