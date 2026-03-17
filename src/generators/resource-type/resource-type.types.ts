import { type Prettify, type HasId, type HasIcon, type HasCommon } from "@";

export type HasResourceType = string | { id: string; icon: string };

export type ResourceTypeCfg = Prettify<HasCommon & HasId & HasIcon>;
