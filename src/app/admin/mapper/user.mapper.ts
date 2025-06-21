import { User } from '../interfaces/user.interface';
import { UserItem } from '../interfaces/user.interfaces';

export class UserMapper {
  static mapUserItem(user: UserItem): User {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static mapUserItemsToUserArray(users: UserItem[]): User[] {
    return users.map(this.mapUserItem);
  }
}
