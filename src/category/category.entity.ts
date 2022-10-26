import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Lot } from '../lot/lot.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(() => Lot, lot => lot.category)
	lots: Lot[];
}
