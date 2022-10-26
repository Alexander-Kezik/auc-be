import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryRepository {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>
	) {}

	async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
		return await this.categoryRepository.save({ ...createCategoryDto });
	}

	async getCategories(): Promise<Category[]> {
		return await this.categoryRepository.find();
	}
}
