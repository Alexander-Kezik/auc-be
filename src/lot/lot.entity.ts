import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Lot {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	startPrice: number;

	@Column({ default: null })
	currentPrice: number;

	@Column()
	immediatePurchasePrice: number;

	@CreateDateColumn()
	startDate: Date;

	@CreateDateColumn()
	endDate: Date;

	@Column()
	lotName: string;

	@Column()
	userId: string;

	@Column()
	categoryId: string;

	@Column({ nullable: true })
	image: string;

	@ManyToOne(() => User, user => user.lots)
	user: User;

	@ManyToOne(() => Category, category => category.lots)
	category: Category;
}
