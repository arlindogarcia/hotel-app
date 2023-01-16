const { NODE_ENV } = process.env;

export default function getEnv(envName: string) {
  if (NODE_ENV === "development") {
    return process.env[envName];
  }
  // @ts-ignore
  return window.prod_env[envName];
}
