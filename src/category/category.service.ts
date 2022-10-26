import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './categoty.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
	constructor(private categoryRepository: CategoryRepository) {}

	createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
		return this.categoryRepository.createCategory(createCategoryDto);
	}

	getCategories(): Promise<Category[]> {
		return this.categoryRepository.getCategories();
	}
}
