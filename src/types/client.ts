export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: string[];
  reviews?: string[];
  rating: number;
  createdBy: String;
  createdAt: string;
  updatedAt: string;
  archivedAt?: Date;
  deletedAt?: Date;
};
