export function include(kind: Kind, config: ElementConfig): boolean {
  const { include, exclude } = config;

  if (include && include?.includes(kind)) return true;
  if (exclude && !exclude?.includes(kind)) return true;
  if (!include && !exclude) return true;
  return false;
}
