import { User } from 'src/app/admin/interfaces/user.interface';

export interface AuthResponse {
  user: User;
  token: string;
}
