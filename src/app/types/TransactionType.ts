export type TransactionType = {
  id: number;
  description: string;
  amount: number;
  isIncome: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTransactionType = {
  description: string;
  amount: number;
  isIncome: boolean;
  date: Date;
}


export type UpdateTransactionType = {
  description?: string;
  amount?: number;
  isIncome?: boolean;
  date?: Date;
}