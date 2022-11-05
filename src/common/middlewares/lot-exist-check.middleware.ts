import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Lot } from '../../lot/lot.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class LotExistCheckMiddleware implements NestMiddleware {
	constructor(
		@InjectRepository(Lot)
		private lotRepository: Repository<Lot>
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		try {
			const lotsWithExpiredTime = await this.lotRepository.find({
				where: { endDate: LessThan(new Date()) },
				select: { id: true }
			});
			await this.lotRepository
				.createQueryBuilder()
				.update({ ended: true })
				.where(lotsWithExpiredTime)
				.execute();
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
		next();
	}
}
