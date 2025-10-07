import { TransactionType, UpdateTransactionType } from "../types/TransactionType";
import { api } from "./api";

const UpdateTransaction = async (id: number, payload: UpdateTransactionType) => {
 try {
    const data = await api.put<TransactionType>(`/Transaction/${id}`, payload);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default UpdateTransaction