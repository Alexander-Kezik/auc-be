export = {
	host: process.env.DB_HOST,
	type: 'postgres',
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['../src/**/*.entity.ts'],
	migrations: ['src/db-settings/migrations/*.ts'],
	cli: {
		migrationsDir: 'src/db-settings/migrations'
	},
	seeds: ['src/db-settings/seeds/**/*.js'],
	factories: ['src/db-settings/factories/**/*.ts'],
	synchronize: false
};
