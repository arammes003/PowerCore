export interface UsersResponse {
  users: UserItem[];
}

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string[];
  createdAt: Date;
  __v: number;
}
