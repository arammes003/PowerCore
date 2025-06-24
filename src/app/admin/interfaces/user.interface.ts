export interface User {
  _id: string;
  avatar?: string;
  createdAt: Date;
  email: string;
  name: string;
  lastName?: string;
  role: string[];
  isActive: boolean;
}
