import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Lot } from './lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { PaginationLotDto } from './dto/pagination-lot.dto';

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

	async getLots(paginationLotDto: PaginationLotDto): Promise<{ lots: Lot[]; count: number }> {
		const { take, skip } = paginationLotDto;

		try {
			const [lots, count] = await this.lotRepository.findAndCount({ take, skip });
			return {
				lots,
				count
			};
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

	async findLotsByName(search_query: string): Promise<{ lots: Lot[]; count: number }> {
		try {
			const [lots, count] = await this.lotRepository.findAndCount({
				where: { lotName: Like(`%${search_query}%`) }
			});
			return {
				lots,
				count
			};
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
			const [lots, count] = await this.lotRepository.findAndCount({
				order: { currentPrice: 'ASC' }
			});
			return {
				lots,
				count
			};
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async getLotsByRandom(): Promise<Lot[]> {
		try {
			return await this.lotRepository.createQueryBuilder().orderBy('RANDOM()').limit(12).getMany();
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}
}
