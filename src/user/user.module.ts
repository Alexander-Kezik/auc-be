import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { Role } from './entities/roles.entity';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'some_secret',
			signOptions: {
				expiresIn: 86400
			}
		}),
		TypeOrmModule.forFeature([User, Role])
	],
	controllers: [UserController, RoleController],
	providers: [UserRepository, UserService, RoleRepository, RoleService, JwtStrategy],
	exports: [UserRepository, JwtStrategy, PassportModule]
})
export class UserModule {}
