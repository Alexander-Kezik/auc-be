import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotController } from './lot.controller';
import { LotService } from './lot.service';
import { Lot } from './lot.entity';
import { LotRepository } from './lot.repository';
import { UserModule } from '../user/user.module';
import { LotExistCheckMiddleware } from '../common/middlewares/lot-exist-check.middleware';

@Module({
	imports: [TypeOrmModule.forFeature([Lot]), UserModule],
	controllers: [LotController],
	providers: [LotService, LotRepository]
})
export class LotModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LotExistCheckMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
	}
}
