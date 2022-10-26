import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { SupportRepository } from './support.repository';
import { CreateMessageToSupportDto } from './dto/create-message-to-support.dto';
import { CreateResponseToSupportDto } from './dto/create-response-to-support.dto';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class SupportService {
	constructor(
		private supportRepository: SupportRepository,
		private userRepository: UserRepository
	) {}

	async createMessageToSupport(
		createMessageToSupportDto: CreateMessageToSupportDto
	): Promise<{ message: string }> {
		try {
			const user = await this.userRepository.findUser({ email: 'p@gmail.com' });
			return this.supportRepository.createMessageToSupport(createMessageToSupportDto, user);
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async createResponseToSupport(
		createResponseToSupportDto: CreateResponseToSupportDto
	): Promise<{ message: string }> {
		try {
			const user = await this.userRepository.findUser({ email: 's@gmail.com' });
			return this.supportRepository.createResponseToUser(createResponseToSupportDto, user);
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}
}
