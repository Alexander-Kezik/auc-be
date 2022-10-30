import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Post,
	Query,
	UseInterceptors
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { RegCredentialsDto } from '../dto/reg-credentials.dto';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import { PaginationDto } from '../../lot/dto/pagination.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/signup')
	signUp(@Body() regCredentialsDto: RegCredentialsDto): Promise<{ id: string; message: string }> {
		return this.userService.signUp(regCredentialsDto);
	}

	@Post('/signin')
	signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ email: string; id: string }> {
		return this.userService.signIn(authCredentialsDto);
	}

	@Get('/one-by-email')
	getUserByEmail(@Query() { email }: { email: string }): Promise<User> {
		return this.userService.getUserByEmail(email);
	}

	@Get('/list')
	getUsers(@Query() paginationDto: PaginationDto): Promise<{ users: User[]; count: number }> {
		return this.userService.getUsers(paginationDto);
	}
}
