export type Rating = {
  _id: string;
  paymentEase: number;
  workEase: number;
  wouldRefer: number;
  overall: number;
  text?: string;
  customer: string;
  createdBy: String;
  createdAt: string;
  updatedAt: string;
  archivedAt?: Date;
  deletedAt?: Date;
};
