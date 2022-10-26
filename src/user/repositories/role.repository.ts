import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/roles.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleRepository {
	constructor(
		@InjectRepository(Role)
		private roleRepository: Repository<Role>
	) {}

	async createRole(createRoleDto: CreateRoleDto): Promise<{ message: string }> {
		const { role } = createRoleDto;

		try {
			await this.roleRepository.save({ role: role.toUpperCase() });
			return { message: `The role ${createRoleDto.role} was created` };
		} catch (e) {
			if (e.code === '23505') {
				throw new ConflictException('This role already exist');
			} else {
				throw new InternalServerErrorException(`Server error: ${e.code}`);
			}
		}
	}

	async findRole(role: string): Promise<Role> {
		return await this.roleRepository.findOne({ where: { role } });
	}
}
