import { createGenerator } from "../index.ts";

export interface Manifest {
  Group: string;
  Name: string;
  Version: string;
  Description: string;
  Authors: {
    Name: string;
    Email?: string;
    Url?: string;
  }[];
  Website: string;
  ServerVersion?: string;
  Dependencies?: object;
  OptionalDependencies?: object;
  DisabledByDefault?: boolean;
  LoadBefore?: object;
  SubPlugins?: [];
}

export const manifest = createGenerator<Manifest, Manifest>({
  json: {
    path: "manifest",
    data: c => c
  }
});
