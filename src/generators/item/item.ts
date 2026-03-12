// export function matchesFilter<Cfg extends HasFilter<string>>(cfg: Cfg, filter: FilterOf<Cfg>): boolean {
//   if (cfg.include) {
//     const includes = Array.isArray(cfg.include) ? cfg.include : [cfg.include];
//     return includes.some(f => filter.includes(f));
//   }

//   if (cfg.exclude) {
//     const excludes = Array.isArray(cfg.exclude) ? cfg.exclude : [cfg.exclude];
//     return !excludes.some(f => filter.includes(f));
//   }

//   return true;
// }

// export function include<Cfg extends HasFilter<string>>(cfg: Cfg, filter: FilterOf<Cfg>) {
//   const { include, exclude } = cfg;
//   return include ? include.includes(filter) : exclude ? !exclude.includes(filter) : true;
// }

// export function filter<Cfg extends HasFilter<string>>(cfgs: Cfg[], filter: FilterOf<Cfg>): Cfg[] {
//   return cfgs.filter(cfg => {
//     if (cfg.include) {
//       const includes = Array.isArray(cfg.include) ? cfg.include : [cfg.include];
//       return includes.some(f => filter.includes(f));
//     }

//     if (cfg.exclude) {
//       const excludes = Array.isArray(cfg.exclude) ? cfg.exclude : [cfg.exclude];
//       return !excludes.some(f => filter.includes(f));
//     }

//     return true;
//   });
// }
