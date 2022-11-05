import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {
		super({ secretOrKey: 'some_secret', jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { email } = payload;
		const user: User = await this.userRepository.findOne({
			where: { email },
			relations: { roles: true }
		});

		if (!user) {
			throw new UnauthorizedException(`User with email "${email}" not exist`);
		}

		return user;
	}
}
