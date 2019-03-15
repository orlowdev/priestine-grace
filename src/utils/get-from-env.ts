/**
 * Extract env variable value or substitute it with the default one.
 */
export const getFromEnv = (key: string, defaultValue: string = ''): string => process.env[key] || defaultValue;
