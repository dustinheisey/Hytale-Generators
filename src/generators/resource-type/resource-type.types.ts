import { type Prettify, type HasId, type HasSimpleIcon, type HasCommon } from "@";

export type HasResourceType = string | { id: string; icon: string };

export type ResourceTypeCfg = Prettify<HasCommon & HasId & HasSimpleIcon>;
