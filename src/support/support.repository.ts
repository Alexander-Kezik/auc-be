import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Support } from './support.entity';
import { CreateMessageToSupportDto } from './dto/create-message-to-support.dto';
import { CreateResponseToSupportDto } from './dto/create-response-to-support.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SupportRepository {
	constructor(
		@InjectRepository(Support)
		private supportRepository: Repository<Support>
	) {}

	async createMessageToSupport(
		createMessageToSupportDto: CreateMessageToSupportDto,
		user: User
	): Promise<{ message: string }> {
		try {
			const messageToSupport = this.supportRepository.create({
				...createMessageToSupportDto,
				users: [user]
			});
			await this.supportRepository.save(messageToSupport);
			return { message: `Thanks ${user.name}, the message was sent. We're response to you soon` };
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}

	async createResponseToUser(
		createResponseToSupportDto: CreateResponseToSupportDto,
		user: User
	): Promise<{ message: string }> {
		const { id, response } = createResponseToSupportDto;

		try {
			const resp = await this.supportRepository.findOne({ where: { id } });
			await this.supportRepository
				.createQueryBuilder()
				.relation(Support, 'users')
				.of(resp)
				.add(user.id);
			await this.supportRepository.update({ id }, { response });
			return { message: `You're responded to user ${user.username}` };
		} catch (e) {
			if (e.code == 23505) {
				throw new ConflictException('Other operator already responded');
			} else {
				throw new InternalServerErrorException(`Server error: ${e.code}`);
			}
		}
	}
}
