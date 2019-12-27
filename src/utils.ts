export const isTestEnvironment = (): boolean => process.env.JEST_WORKER_ID !== undefined;
