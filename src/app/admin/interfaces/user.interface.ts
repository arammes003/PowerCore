export interface User {
  _id: string;
  avatar?: string;
  created_at: Date;
  email: string;
  name: string;
  last_name?: string;
  dni: string;
  phone: string;
  gender: string;
  role: string[];
  is_active: boolean;
}
