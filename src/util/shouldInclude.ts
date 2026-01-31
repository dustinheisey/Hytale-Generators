export function shouldInclude(
  kind: Kind,
  config?: Config,
): boolean {
  if (config) {
    if (config.include && config.include?.includes(kind)) return true;
    if (config.exclude && !config.exclude?.includes(kind)) return true;
    if (!config.include && !config.exclude) return true;
    return false;
  }
  return true;
}