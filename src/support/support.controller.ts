import { Body, Controller, Patch, Post } from '@nestjs/common';

import { SupportService } from './support.service';
import { CreateMessageToSupportDto } from './dto/create-message-to-support.dto';
import { CreateResponseToSupportDto } from './dto/create-response-to-support.dto';

@Controller('support')
export class SupportController {
	constructor(private supportService: SupportService) {}

	@Post('create-message-to-support')
	createMessageToSupport(
		@Body() createMessageToSupportDto: CreateMessageToSupportDto
	): Promise<{ message: string }> {
		return this.supportService.createMessageToSupport(createMessageToSupportDto);
	}

	@Patch('create-response-to-support')
	createResponseToSupport(
		@Body() createResponseToSupportDto: CreateResponseToSupportDto
	): Promise<{ message: string }> {
		return this.supportService.createResponseToSupport(createResponseToSupportDto);
	}
}
