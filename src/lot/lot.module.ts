import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotController } from './lot.controller';
import { LotService } from './lot.service';
import { Lot } from './lot.entity';
import { LotRepository } from './lot.repository';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Lot]), UserModule],
	controllers: [LotController],
	providers: [LotService, LotRepository]
})
export class LotModule {}
