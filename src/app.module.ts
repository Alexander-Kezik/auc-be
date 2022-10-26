import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { UserModule } from './user/user.module';
import { LotModule } from './lot/lot.module';
import { CategoryModule } from './category/category.module';
import { SupportModule } from './support/support.module';

dotenv.config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			autoLoadEntities: true,
			synchronize: true
		}),
		UserModule,
		LotModule,
		CategoryModule,
		SupportModule
	]
})
export class AppModule {}
