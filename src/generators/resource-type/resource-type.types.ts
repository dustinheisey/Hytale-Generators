import { type Prettify, type HasId, type HasSimpleIcon } from "@";

export type HasResourceType = string | { id: string; icon: string };
export type ResourceTypeCfg = Prettify<HasId & HasSimpleIcon>;
