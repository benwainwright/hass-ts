export const getEnv = (name: string): string => {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Environment variable ${name} not set`);
  }

  return val;
};
