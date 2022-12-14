import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import RequestWithUser from '../interfaces/request-with-user.interface';

export const GetUserId = createParamDecorator((_data, ctx: ExecutionContext): string => {
	const req = ctx.switchToHttp().getRequest<RequestWithUser>();
	return req.user.id;
});
