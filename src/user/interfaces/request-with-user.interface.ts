import { User } from '../entities/user.entity';

export default interface RequestWithUser extends Request {
	user: User;
}
