import { Injectable } from '@nestjs/common';

import { Lot } from './lot.entity';
import { LotRepository } from './lot.repository';
import { CreateLotDto } from './dto/create-lot.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class LotService {
	constructor(private lotRepository: LotRepository, private userRepository: UserRepository) {}

	createLot(createLotDto: CreateLotDto): Promise<Lot> {
		return this.lotRepository.createLot(createLotDto);
	}

	getLots(paginationDto: PaginationDto): Promise<{ lots: Lot[]; count: number }> {
		return this.lotRepository.getLots(paginationDto);
	}

	async getLot(id: string): Promise<{ lot: Lot; username: string }> {
		const lot = await this.lotRepository.getLot(id);
		const { username } = await this.userRepository.findUser({ id: lot.userId });

		return { lot, username };
	}

	findLotsByName(searchQuery: string): Promise<{ lots: Lot[]; count: number }> {
		return this.lotRepository.findLotsByName(searchQuery);
	}

	deleteLot(id: string): Promise<{ message: string }> {
		return this.lotRepository.deleteLot(id);
	}

	getLotsByRandom(): Promise<Lot[]> {
		return this.lotRepository.getLotsByRandom();
	}

	increaseStake(value: number, id: string): Promise<{ newPrice: number }> {
		return this.lotRepository.increaseStake(value, id);
	}

	buyLot(id: string): Promise<{ message: string }> {
		return this.lotRepository.buyLot(id);
	}

	async getLotsByEmail(email: string): Promise<Lot[]> {
		const { id } = await this.userRepository.findUser({ email });
		return this.lotRepository.getLotsByUserId(id);
	}
}
