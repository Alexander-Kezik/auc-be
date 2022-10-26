import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../entities/user.entity';

export const GetUserId = createParamDecorator((_data, ctx: ExecutionContext): User => {
	const req = ctx.switchToHttp().getRequest();
	console.log(req);
	return req.user.id;
});
