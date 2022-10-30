import { Repository } from 'typeorm';
import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegCredentialsDto } from '../dto/reg-credentials.dto';
import { sendConfirmationEmail } from '../utils/send-email-confirmation';
import { RoleRepository } from './role.repository';
import { PaginationDto } from '../../lot/dto/pagination.dto';

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private roleRepository: RoleRepository
	) {}

	async createUser(regCredentialsDto: RegCredentialsDto): Promise<{ id: string; message: string }> {
		const { name, username, password, email } = regCredentialsDto;

		try {
			const role = await this.roleRepository.findRole('USER');
			const hashedPassword = await bcrypt.hash(password, 5);
			const confirmationCode = uuid();
			const user = this.userRepository.create({
				name,
				username,
				email,
				password: hashedPassword,
				confirmationCode,
				roles: [role]
			});
			await this.userRepository.save(user);
			// sendConfirmationEmail(name, email, confirmationCode);
			return { id: user.id, message: 'Confirm your account' };
		} catch (e) {
			if (e.code === '23505') {
				throw new ConflictException('User with this email or username are exist');
			} else {
				throw new InternalServerErrorException(`Server error: ${e.code}`);
			}
		}
	}

	async findUser({ email, id }: { email?: string; id?: string }): Promise<User> {
		let user: User;

		try {
			user = email
				? await this.userRepository.findOne({ where: { email } })
				: await this.userRepository.findOne({ where: { id } });
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}

		if (!user) {
			throw new NotFoundException(`User with email "${email}" not exist`);
		}

		return user;
	}

	async findUsers({
		take = 10,
		skip = 0
	}: PaginationDto): Promise<{ users: User[]; count: number }> {
		try {
			const [users, count] = await this.userRepository.findAndCount({ take, skip });
			return { users, count };
		} catch (e) {
			throw new InternalServerErrorException(`Server error: ${e.code}`);
		}
	}
}
