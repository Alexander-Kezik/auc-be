import { MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from '../role.enum';

export class CreateRoleDto {
	@MinLength(3)
	@MaxLength(20)
	role: RoleEnum;
}
