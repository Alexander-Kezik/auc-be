import { Length, MaxLength, MinLength } from 'class-validator';

export class CreateResponseToSupportDto {
	@MinLength(5)
	@MaxLength(200)
	response: string;

	@Length(36)
	id: string;
}
