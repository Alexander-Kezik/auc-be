import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn
} from 'typeorm';

import { User } from '../user/entities/user.entity';
import { ResponseStatus } from './response-status.enum';

@Entity()
export class Support {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	message: string;

	@Column({ default: ResponseStatus.WAITING_FOR_RESPONSE })
	status: string;

	@Column({ default: null })
	response: string;

	@CreateDateColumn()
	msgSentDate: Date;

	@ManyToMany(() => User, { cascade: true })
	@JoinTable()
	users: User[];
}
