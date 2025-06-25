export interface User {
  _id: string;
  avatar?: string;
  created_at: Date;
  email: string;
  name: string;
  last_name?: string;
  role: string[];
  is_active: boolean;
}
