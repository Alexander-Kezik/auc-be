import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Like, Repository, UpdateResult } from 'typeorm';

import { Lot } from './lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class LotRepository {
	constructor(
		@InjectRepository(Lot)
		private lotRepository: Repository<Lot>
	) {}

	async createLot(createLotDto: CreateLotDto): Promise<Lot> {
		try {
			return await this.lotRepository.save({
				...createLotDto,
				userId: 'b2e0d854-55e2-4e6b-a0ce-8c76ddd56c4a',
				categoryId: '6f529cf7-298b-4c11-8505-c457ea849d44',
				currentPrice: createLotDto.startPrice,
				endDate: createLotDto.endDate
			});
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async getLots({ take = 10, skip = 0 }: PaginationDto): Promise<{ lots: Lot[]; count: number }> {
		try {
			await this.changeLotStatusByTime();
			const [lots, count] = await this.lotRepository.findAndCount({
				take,
				skip,
				order: { endDate: 'ASC' },
				where: { ended: false }
			});
			return { lots, count };
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async getLot(id: string): Promise<Lot> {
		try {
			return await this.lotRepository.findOne({ where: { id } });
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async findLotsByName(searchQuery: string): Promise<{ lots: Lot[]; count: number }> {
		try {
			const [lots, count] = await this.lotRepository.findAndCount({
				where: { lotName: Like(`%${searchQuery}%`), ended: false }
			});
			return { lots, count };
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async deleteLot(id: string): Promise<{ message: string }> {
		try {
			await this.lotRepository.delete({ id });
			return { message: `Lot was deleted` };
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async sortLotsByCurrentPrices(): Promise<{ lots: Lot[]; count: number }> {
		try {
			await this.changeLotStatusByTime();
			const [lots, count] = await this.lotRepository.findAndCount({
				order: { currentPrice: 'ASC' },
				where: { ended: false }
			});
			return { lots, count };
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async getLotsByRandom(): Promise<Lot[]> {
		try {
			await this.changeLotStatusByTime();
			return await this.lotRepository.createQueryBuilder().orderBy('RANDOM()').limit(12).getMany();
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async increaseStake(value: number, id: string): Promise<{ newPrice: number }> {
		let lot: Lot;

		try {
			await this.changeLotStatusByTime();
			const lot = await this.lotRepository.findOne({ where: { id, ended: false } });
			if (lot && value / lot.startPrice >= lot.startPrice * 0.1) {
				await this.lotRepository
					.createQueryBuilder()
					.update({ currentPrice: lot.currentPrice + value })
					.where({ id })
					.execute();
				return { newPrice: lot.currentPrice + value };
			}
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}

		if (!lot) {
			throw new NotFoundException(`Auction was ended or not exist`);
		} else {
			throw new RangeError(`You must raise a stake at least 10% of start price`);
		}
	}

	async buyLot(id: string): Promise<{ message: string }> {
		let result: UpdateResult;

		try {
			await this.changeLotStatusByTime();
			result = await this.lotRepository
				.createQueryBuilder()
				.update({ ended: true })
				.where({ id, ended: false })
				.execute();
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}

		if (result.affected === 1) {
			return { message: `Congratulations, you bought this lot!` };
		} else {
			throw new NotFoundException(`Auction was ended or not exist`);
		}
	}

	async changeLotStatusByTime(): Promise<void> {
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
	}
}
