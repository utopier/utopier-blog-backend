module.exports =  {
    type: 'mysql',
    database: 'blogdb',
    host: process.env.AWS_RDS_ENDPOINT,
    port: 3306,
    username: process.env.AWS_RDS_USERNAME,
    password: process.env.AWS_RDS_PASSWORD,
    entities: ['entities/**/*.*'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscriber',
    },
    synchronize: true,
    logging: true,
};