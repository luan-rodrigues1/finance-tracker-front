export type TransactionType = {
  id: number;
  description: string;
  amount: number;
  isIncome: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};