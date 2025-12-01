export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USER ?? 'clinify',
    password: process.env.DB_PASSWORD ?? 'clinify',
    name: process.env.DB_NAME ?? 'clinify',
  },
  auth: {
    accessTokenTtl: process.env.JWT_ACCESS_TTL ?? '15m',
    refreshTokenTtl: process.env.JWT_REFRESH_TTL ?? '7d',
    accessTokenSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
  },
});
