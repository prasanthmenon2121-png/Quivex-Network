/**
 * Environment variable validation and configuration.
 * Ensures all required variables are present at app startup.
 */

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL'),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  },
  zego: {
    appId: Number(getEnvVar('VITE_ZEGO_APP_ID')),
  },
  app: {
    name: getEnvVar('VITE_APP_NAME'),
    version: getEnvVar('VITE_APP_VERSION'),
  },
} as const;

// Validate ZEGO_APP_ID is a valid number
if (isNaN(env.zego.appId)) {
  throw new Error('VITE_ZEGO_APP_ID must be a valid number');
}
