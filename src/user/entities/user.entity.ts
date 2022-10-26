import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';

import { UserStatus } from '../user-status.enum';
import { Lot } from '../../lot/lot.entity';
import { Role } from './roles.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ default: UserStatus.EMAIL_CONFIRMATION, enum: UserStatus })
	status: UserStatus;

	@Column()
	confirmationCode: string;

	@OneToMany(() => Lot, lot => lot.user)
	lots: Lot[];

	@ManyToMany(() => Role)
	@JoinTable()
	roles: Role[];
}
