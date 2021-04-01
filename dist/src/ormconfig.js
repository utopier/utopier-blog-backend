"use strict";
module.exports = {
    type: 'mysql',
    database: 'blogdb',
    host: process.env.DB_ENDPOINT,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
//# sourceMappingURL=ormconfig.js.map