import { User } from '../interfaces/user.interface';
import { UserItem } from '../interfaces/user.interfaces';

export class UserMapper {
  static mapUserItem(user: UserItem): User {
    return {
      _id: user._id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      avatar: user.avatar,
      is_active: user.is_active,
      dni: user.dni,
      phone: user.phone,
      gender: user.gender,
    };
  }

  static mapUserItemsToUserArray(users: UserItem[]): User[] {
    return users.map(this.mapUserItem);
  }
}
