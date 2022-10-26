import { MinLength, MaxLength, IsEmail, Matches } from 'class-validator';

export class RegCredentialsDto {
	@MinLength(3, { message: 'name is short' })
	@MaxLength(20, { message: 'name is long' })
	@Matches('[a-zA-Z0-9]')
	name: string;

	@MinLength(3, { message: 'username is short' })
	@MaxLength(20, { message: 'username is long' })
	username: string;

	@IsEmail({}, { message: 'email is not valid' })
	email: string;

	@MinLength(8, { message: 'password is short' })
	@MaxLength(16, { message: 'password is long' })
	password: string;
}
