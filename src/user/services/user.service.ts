import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { RegCredentialsDto } from '../dto/reg-credentials.dto';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserStatus } from '../user-status.enum';
import { User } from '../entities/user.entity';
import { PaginationDto } from '../../lot/dto/pagination.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

	signUp(regCredentialsDto: RegCredentialsDto): Promise<{ message: string }> {
		return this.userRepository.createUser(regCredentialsDto);
	}

	async signIn(
		authCredentialsDto: AuthCredentialsDto
	): Promise<{ email: string; username: string; name: string; accessToken: string }> {
		const { email, password } = authCredentialsDto;
		const user = await this.userRepository.findUser({ email });

		if (user.status === UserStatus.EMAIL_CONFIRMATION) {
			throw new UnauthorizedException('Confirm your email');
		} else if (user.status === UserStatus.BANNED) {
			throw new UnauthorizedException('This account was banned');
		}

		if (await bcrypt.compare(password, user.password)) {
			const payload: JwtPayload = { email, username: user.username, id: user.id, name: user.name };
			const accessToken: string = await this.jwtService.sign(payload);

			return { email, username: user.username, name: user.name, accessToken };
		} else {
			throw new UnauthorizedException('Wrong password');
		}
	}

	async verifyToken(
		user: User
	): Promise<{ email: string; username: string; name: string; accessToken: string }> {
		if (!user) {
			throw new ForbiddenException('Not authorized');
		}

		const { id, email, username, name } = user;

		const payload: JwtPayload = { id, email, username, name };

		const accessToken: string = await this.jwtService.sign(payload);
		return { accessToken, email, name, username };
	}

	async getUserByEmail(
		userEmail: string
	): Promise<{ email: string; name: string; username: string }> {
		const { name, username, email } = await this.userRepository.findUser({ email: userEmail });

		return { name, username, email };
	}

	getUsers(
		paginationDto: PaginationDto,
		userId: string
	): Promise<{ users: User[]; count: number }> {
		return this.userRepository.findUsers(paginationDto, userId);
	}

	topUp(userId: string, userBalance: number, amount: number): Promise<{ balance: number }> {
		return this.userRepository.topUp(userId, userBalance, amount);
	}
}
