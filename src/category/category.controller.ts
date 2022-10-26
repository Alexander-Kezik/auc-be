import { Body, Controller, Get, Post } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post('create')
	createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
		return this.categoryService.createCategory(createCategoryDto);
	}

	@Get('get')
	getCategories(): Promise<Category[]> {
		return this.categoryService.getCategories();
	}
}
