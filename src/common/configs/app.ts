import dotenv from 'dotenv';

dotenv.config();

export const APP_CONFIGS = {
  NODE_ENV: process.env.NODE_ENV,
  ROLE_ADMIN: process.env.ROLE_ADMIN as string,
  ROLE_OFFICIAL: process.env.ROLE_OFFICIAL as string,
  ROLE_GAMETEAM_EDITOR: process.env.ROLE_GAMETEAM_EDITOR as string,
  ROLE_ANALYST_EDITOR: process.env.ROLE_ANALYST_EDITOR as string,
  ROLE_ANALYST_MANAGER: process.env.ROLE_ANALYST_MANAGER as string,
};
