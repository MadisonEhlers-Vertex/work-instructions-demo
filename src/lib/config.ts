import type { Environment } from "@vertexvis/viewer";

export interface Configuration {
  readonly authoring: boolean;
  readonly vertexEnv: Environment;
}

export interface StreamCredentials {
  readonly clientId: string;
  readonly streamKey: string;
}

export const Config: Configuration = {
  authoring: envVar("AUTHORING", "false") === "true",
  vertexEnv: envVar("VERTEX_ENV", "platdev") as Environment,
};

function envVar(name: string, fallback: string): string {
  const ev = process.env[name];
  return ev ? ev : fallback;
}
