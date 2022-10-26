import { IsDate, Max, MaxDate, MaxLength, Min, MinDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLotDto {
	@Min(0.01)
	@Max(9999999999.99)
	startPrice: number;

	@Min(0.01)
	@Max(9999999999.99)
	immediatePurchasePrice: number;

	@MinLength(3)
	@MaxLength(30)
	lotName: string;

	@IsDate()
	@Type(() => Date)
	@MinDate(new Date(new Date().setDate(new Date().getDate() + 7)))
	@MaxDate(new Date(new Date().setDate(new Date().getDate() + 30)))
	endDate: Date;
}
