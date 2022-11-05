import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

import { RoleEnum } from './role.enum';
import { User } from './entities/user.entity';
import RequestWithUser from './interfaces/request-with-user.interface';

const RoleGuard = (role: RoleEnum): Type<CanActivate> => {
	class RoleGuardMixin implements CanActivate {
		canActivate(context: ExecutionContext) {
			const request = context.switchToHttp().getRequest<RequestWithUser>();
			const user: User = request.user;

			return user.roles.map(({ role }) => role).includes(role);
		}
	}

	return mixin(RoleGuardMixin);
};

export default RoleGuard;
