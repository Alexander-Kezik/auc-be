import { Body, Controller, Post } from '@nestjs/common';

import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('role')
export class RoleController {
	constructor(private roleService: RoleService) {}

	@Post('create')
	createRole(@Body() createRoleDto: CreateRoleDto): Promise<{ message: string }> {
		return this.roleService.createRole(createRoleDto);
	}
}
