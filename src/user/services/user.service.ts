import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { RegCredentialsDto } from '../dto/reg-credentials.dto';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserStatus } from '../user-status.enum';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	signUp(regCredentialsDto: RegCredentialsDto): Promise<{ id: string; message: string }> {
		return this.userRepository.createUser(regCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ email: string; id: string }> {
		const { email, password } = authCredentialsDto;
		const user = await this.userRepository.findUser({ email });

		if (user.status === UserStatus.EMAIL_CONFIRMATION) {
			throw new UnauthorizedException('Confirm your email');
		} else if (user.status === UserStatus.BANNED) {
			throw new UnauthorizedException('This account was banned');
		}

		if (await bcrypt.compare(password, user.password)) {
			return { email, id: user.id };
		} else {
			throw new UnauthorizedException('Wrong password');
		}
	}
}
