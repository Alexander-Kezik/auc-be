import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { RegCredentialsDto } from '../dto/reg-credentials.dto';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

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
}
