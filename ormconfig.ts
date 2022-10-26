export = {
	host: process.env.DB_HOST,
	type: 'postgres',
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['../src/**/*.entity.ts'],
	// migrations: ['src/migrations/*.ts'],
	// cli: {
	//   migrationsDir: 'src/migrations',
	// },
	// seeds: ['src/seeds/**/*.js'],
	// factories: ['src/factories/**/*.ts'],
	synchronize: false
};
