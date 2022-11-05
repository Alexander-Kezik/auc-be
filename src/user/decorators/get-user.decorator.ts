import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../entities/user.entity';
import RequestWithUser from '../interfaces/request-with-user.interface';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
	const req = ctx.switchToHttp().getRequest<RequestWithUser>();
	return req.user;
});
