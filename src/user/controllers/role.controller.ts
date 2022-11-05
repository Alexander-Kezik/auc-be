import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from '../role.guard';
import { RoleEnum } from '../role.enum';

@Controller('role')
export class RoleController {
	constructor(private roleService: RoleService) {}

	@Post('create')
	createRole(@Body() createRoleDto: CreateRoleDto): Promise<{ message: string }> {
		return this.roleService.createRole(createRoleDto);
	}

	@Post('test')
	@UseGuards(RoleGuard(RoleEnum.ADMIN))
	@UseGuards(AuthGuard())
	sm(): void {
		console.log(1);
	}
}
