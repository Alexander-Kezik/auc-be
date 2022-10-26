import { Injectable } from '@nestjs/common';

import { Lot } from './lot.entity';
import { LotRepository } from './lot.repository';
import { CreateLotDto } from './dto/create-lot.dto';
import { PaginationLotDto } from './dto/pagination-lot.dto';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class LotService {
	constructor(private lotRepository: LotRepository, private userRepository: UserRepository) {}

	createLot(createLotDto: CreateLotDto): Promise<Lot> {
		return this.lotRepository.createLot(createLotDto);
	}

	getLots(paginationLotDto: PaginationLotDto): Promise<{ lots: Lot[]; count: number }> {
		return this.lotRepository.getLots(paginationLotDto);
	}

	async getLot(id: string): Promise<{ lot: Lot; username: string }> {
		const lot = await this.lotRepository.getLot(id);
		const { username } = await this.userRepository.findUser({ id: lot.userId });

		return { lot, username };
	}

	findLotsByName(search_query: string): Promise<{ lots: Lot[]; count: number }> {
		return this.lotRepository.findLotsByName(search_query);
	}

	deleteLot(id: string): Promise<{ message: string }> {
		return this.lotRepository.deleteLot(id);
	}

	getLotsByRandom(): Promise<Lot[]> {
		return this.lotRepository.getLotsByRandom();
	}
}
