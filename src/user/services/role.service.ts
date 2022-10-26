import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleService {
	constructor(private roleRepository: RoleRepository) {}

	createRole(createRoleDto: CreateRoleDto) {
		return this.roleRepository.createRole(createRoleDto);
	}
}
