import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Support } from './support.entity';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { SupportRepository } from './support.repository';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Support]), UserModule],
	controllers: [SupportController],
	providers: [SupportService, SupportRepository]
})
export class SupportModule {}
