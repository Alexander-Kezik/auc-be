import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { Lot } from './lot.entity';
import { PaginationDto } from './dto/pagination.dto';
import { IncreaseStakeDto } from './dto/increase-stake.dto';

@Controller('lot')
export class LotController {
	constructor(private lotService: LotService) {}

	@Post('create')
	createPost(@Body() createLotDto: CreateLotDto): Promise<Lot> {
		return this.lotService.createLot(createLotDto);
	}

	@Get('get')
	getLots(@Query() paginationDto: PaginationDto): Promise<{ lots: Lot[]; count: number }> {
		return this.lotService.getLots(paginationDto);
	}

	@Get('get/one/:id')
	getLot(@Param('id') id: string): Promise<{ lot: Lot; username: string }> {
		return this.lotService.getLot(id);
	}

	@Get('get/by-name')
	findLotsByName(
		@Query('search_query') searchQuery: string
	): Promise<{ lots: Lot[]; count: number }> {
		return this.lotService.findLotsByName(searchQuery);
	}

	@Get('get/random')
	getLotsByRandom(): Promise<Lot[]> {
		return this.lotService.getLotsByRandom();
	}

	@Delete('delete/:id')
	deleteLot(@Param('id') id: string): Promise<{ message: string }> {
		return this.lotService.deleteLot(id);
	}

	@Patch(':id/increase')
	increaseStake(
		@Body() increaseStakeDto: IncreaseStakeDto,
		@Param('id') id: string
	): Promise<{ newPrice: number }> {
		return this.lotService.increaseStake(increaseStakeDto.value, id);
	}

	@Patch(':id/buy')
	buyLot(@Param('id') id: string): Promise<{ message: string }> {
		return this.lotService.buyLot(id);
	}
}
