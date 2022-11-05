import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Patch,
	Post,
	Query,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { RegCredentialsDto } from '../dto/reg-credentials.dto';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import { PaginationDto } from '../../lot/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { GetUserId } from '../decorators/get-user-id.decorator';
import { GetUserBalance } from '../decorators/get-user-balance.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/signup')
	signUp(@Body() regCredentialsDto: RegCredentialsDto): Promise<{ message: string }> {
		return this.userService.signUp(regCredentialsDto);
	}

	@Post('/signin')
	signIn(
		@Body() authCredentialsDto: AuthCredentialsDto
	): Promise<{ email: string; username: string; name: string; accessToken: string }> {
		return this.userService.signIn(authCredentialsDto);
	}

	@Get('/get-by-email')
	getUserByEmail(
		@Query() { email }: { email: string }
	): Promise<{ email: string; name: string; username: string }> {
		return this.userService.getUserByEmail(email);
	}

	@Get('/verify-token')
	@UseGuards(AuthGuard())
	verifyToken(
		@GetUser() user: User
	): Promise<{ email: string; username: string; name: string; accessToken: string }> {
		return this.userService.verifyToken(user);
	}

	@Get('/get-users')
	@UseGuards(AuthGuard())
	getUsers(
		@Query() paginationDto: PaginationDto,
		@GetUserId() userId: string
	): Promise<{ users: User[]; count: number }> {
		return this.userService.getUsers(paginationDto, userId);
	}

	@Patch('/top-up')
	@UseGuards(AuthGuard())
	topUp(
		@Body() { amount }: { amount: number },
		@GetUserId() userId: string,
		@GetUserBalance() userBalance: number
	): Promise<{ balance: number }> {
		return this.userService.topUp(userId, userBalance, amount);
	}
}
