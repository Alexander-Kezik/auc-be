import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { Lot } from './lot.entity';
import { PaginationLotDto } from './dto/pagination-lot.dto';

@Controller('lot')
export class LotController {
	constructor(private lotService: LotService) {}

	@Post('create')
	createPost(@Body() createLotDto: CreateLotDto): Promise<Lot> {
		return this.lotService.createLot(createLotDto);
	}

	@Get('get')
	getLots(@Query() paginationLotDto: PaginationLotDto): Promise<{ lots: Lot[]; count: number }> {
		return this.lotService.getLots(paginationLotDto);
	}

	@Get('get/one/:id')
	getLot(@Param('id') id: string): Promise<{ lot: Lot; username: string }> {
		return this.lotService.getLot(id);
	}

	@Get('get/by-name')
	findLotsByName(
		@Query('search_query') search_query: string
	): Promise<{ lots: Lot[]; count: number }> {
		return this.lotService.findLotsByName(search_query);
	}

	@Get('get/random')
	getLotsByRandom(): Promise<Lot[]> {
		return this.lotService.getLotsByRandom();
	}

	@Delete('delete/:id')
	deleteLot(@Param('id') id: string): Promise<{ message: string }> {
		return this.lotService.deleteLot(id);
	}
}
