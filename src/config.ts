export const ENVIORNMENT = { PROD: 'production', DEV: 'development' };
const env = (name: string, default_: string) => process.env[name] || default_;

export const configs = {
  [ENVIORNMENT.DEV]: { GOOGLE_CLIENT_SECRET: env('GOOGLE_CLIENT_SECRET', '') },

  [ENVIORNMENT.PROD]: { GOOGLE_CLIENT_SECRET: env('GOOGLE_CLIENT_SECRET', '') },
};

export const envConfigs = configs[process.env.DEPLOY_ENV || ENVIORNMENT.DEV];
