import { MaxLength, MinLength } from 'class-validator';

export class CreateMessageToSupportDto {
	@MinLength(5)
	@MaxLength(200)
	message: string;
}
