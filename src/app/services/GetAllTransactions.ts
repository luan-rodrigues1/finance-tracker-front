import { TransactionType } from "../types/TransactionType";
import { api } from "./api";

const GetAllTransactions = async () => {
  try {
    const data = await api.get<TransactionType[]>("/Transaction", {
      params: { OrderBy: "ASC" },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default GetAllTransactions;