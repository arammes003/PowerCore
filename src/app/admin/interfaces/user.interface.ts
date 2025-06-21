export interface User {
  _id: string;
  avatar?: string;
  createdAt: Date;
  email: string;
  name: string;
  role: string[];
  status: boolean;
}
