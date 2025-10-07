import { CreateTransactionType, TransactionType } from "../types/TransactionType";
import { api } from "./api";


const CreateTransaction = async (transaction: CreateTransactionType) => {
  try {
    const data = await api.post<TransactionType>("/Transaction", transaction);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default CreateTransaction;