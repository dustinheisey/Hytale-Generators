// import { generate, shouldInclude, uppercase } from "./syncJson.ts";

// export type JobConfig<TSchema> = {
//   file: string;
//   lang: { name: string; description?: string };
//   name: string;
//   description?: string | null;
//   data: TSchema; // ? the JSON schema object
// };

// type GeneratorConfig<TSchema extends Schema, TConfig extends Config> = {
//   id: string; // ? e.g. "Ingredient_Bar"
//   kind: Kind; // ? e.g. "ingot"
//   file?: (u: string) => string;
//   displayName?: (u: string) => string;
//   langBase?: (u: string) => string;
//   serverBase?: (u: string) => string;
//   build: (u: string, cfg?: TConfig) => Omit<TSchema, "TranslationProperties">;
// };

// export function createGenerator<
//   TSchema extends Schema,
//   TConfig extends Config,
// >(config: GeneratorConfig<TSchema, TConfig>) {
//   return (rawName: string, cfg?: TConfig) => {
//     // ? Filter out generations
//     if (!shouldInclude(config.kind, cfg)) return;

//     const u = uppercase(rawName);

//     // ? Build schema body (without TranslationProperties)
//     const data = config.build(u, cfg) as TSchema;

//     const file = config.file?.(u) ?? `${u}/${config.id}_${u}`;
//     const langBase = config.langBase?.(u) ?? `items.${config.id}_${u}`;
//     const serverBase = config.serverBase?.(u) ??
//       `server.items.${config.id}_${u}`;

//     // ? Add name
//     data.TranslationProperties = {
//       Name: `${serverBase}.name`,
//     };

//     // ? Add description if passed
//     if (cfg?.description) {
//       data.TranslationProperties.Description = `${serverBase}.description`;
//     }

//     const job: JobConfig<TSchema> = {
//       file,
//       lang: {
//         name: `${langBase}.name`,
//         description: `${langBase}.description`,
//       },
//       name: config.displayName?.(u) ?? u,
//       description: cfg?.description ?? null,
//       data,
//     };

//     // ? Run generate
//     generate(job);
//   };
// }
