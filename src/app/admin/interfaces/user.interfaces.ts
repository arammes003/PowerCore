export interface UsersResponse {
  users: UserItem[];
}

export interface UserItem {
  __v: number;
  _id: string;
  avatar?: string;
  created_at: Date;
  email: string;
  name: string;
  last_name?: string;
  password: string;
  role: string[];
  gender: string;
  dni: string;
  phone: string;
  is_active: boolean;
}
