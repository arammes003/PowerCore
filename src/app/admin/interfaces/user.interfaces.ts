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
  password: string;
  role: string[];
  status: boolean;
}
