import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import RequestWithUser from '../interfaces/request-with-user.interface';

export const GetUserBalance = createParamDecorator((_data, ctx: ExecutionContext): number => {
	const req = ctx.switchToHttp().getRequest<RequestWithUser>();
	return req.user.balance;
});
