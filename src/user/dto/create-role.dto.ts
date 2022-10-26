import { MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
	@MinLength(3)
	@MaxLength(20)
	role: string;
}
