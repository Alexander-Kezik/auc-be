import { MinLength, MaxLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
	@IsEmail({}, { message: 'email is not valid' })
	email: string;

	@MinLength(8, { message: 'password is short' })
	@MaxLength(16, { message: 'password is long' })
	password: string;
}
