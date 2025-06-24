export interface UsersResponse {
  users: UserItem[];
}

export interface UserItem {
  __v: number;
  _id: string;
  avatar?: string;
  createdAt: Date;
  email: string;
  name: string;
  lastName?: string;
  password: string;
  role: string[];
  isActive: boolean;
}
