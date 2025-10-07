import { api } from "./api";


const DeleteTransaction = async (id: number) => {
  try {
    await api.delete<void>(`/Transaction/${id}`);
  } catch (err) {
    console.error(err);
  }
}

export default DeleteTransaction;