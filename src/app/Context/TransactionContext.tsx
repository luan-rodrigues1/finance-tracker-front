"use client";

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { CreateTransactionType, UpdateTransactionType, TransactionType } from "../types/TransactionType";
import GetAllTransactions from "../services/GetAllTransactions";
import CreateTransaction from "../services/CreateTransaction";
import DeleteTransaction from "../services/DeleteTransaction";
import UpdateTransaction from "../services/UpdateTransaction";
import { toast } from "react-toastify";

type TransactionContextType = {
  transactions: TransactionType[];
  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionType) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
  selectUpdateData: Omit<TransactionType,  "createdAt" | "updatedAt"> | undefined
  setSelectUpdateData: Dispatch<SetStateAction<Omit<TransactionType, "createdAt" | "updatedAt"> | undefined>>
  selectDeleteId: number
  setSelectDeleteId: Dispatch<SetStateAction<number>>
  updateTransaction: (id: number, transaction: UpdateTransactionType) => Promise<void>
  loadingTransaction: boolean
  loadingCreate: boolean
  loadingUpdate: boolean
  loadingDelete: boolean
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

type TransactionProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [selectUpdateData, setSelectUpdateData] = useState<Omit<TransactionType, "createdAt" | "updatedAt">>()
    const [selectDeleteId, setSelectDeleteId] = useState<number>(0)
    const [loadingTransaction, setLoadingTransaction] = useState<boolean>(true)
    const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const listTransactions = async () => {
        setLoadingTransaction(true)
        const data = await GetAllTransactions();
          if (data) {
            setTransactions(data);
        }

        setLoadingTransaction(false)
    }

    const fetchTransactions = async () => {
        const data = await GetAllTransactions();
        if (data) {
            setTransactions(data);
        }
    };

    const createTransaction = async (transaction: CreateTransactionType) => {
        try {
            setLoadingCreate(true)
            await CreateTransaction(transaction);
            const updatedTransactions = await GetAllTransactions();
            if (updatedTransactions) {
                setTransactions(updatedTransactions);
            }
            toast.success("Transação criada com sucesso!");
            setLoadingCreate(false)
        } catch (err) {
            console.error("Erro ao criar transação:", err);
            toast.error("Erro ao criar transação.");
            setLoadingCreate(false)
        }
    };

    const deleteTransaction = async (id: number) => {
        try {
            setLoadingDelete(true)
            await DeleteTransaction(id);
            const updatedTransactions = await GetAllTransactions();

            if (updatedTransactions) {
                setTransactions(updatedTransactions);
            }
            toast.success("Transação deletada com sucesso!");
            setLoadingDelete(false)
        } catch (err) {
            console.error("Erro ao criar transação:", err);
            toast.error("Erro ao deletar transação.");
            setLoadingDelete(false)
        }
    };

    const updateTransaction = async (id: number, transaction: UpdateTransactionType) => {
        try {
            setLoadingUpdate(true)
            await UpdateTransaction(id, transaction);
            const updatedTransactions = await GetAllTransactions();
            if (updatedTransactions) {
                setTransactions(updatedTransactions);
            }
            toast.success("Transação atualizada com sucesso!");
            setLoadingUpdate(false)
        } catch (err) {
            console.error("Erro ao criar transação:", err);
            toast.error("Erro ao atualizar transação.");
            setLoadingUpdate(false)
        }
    };

    useEffect(() => {
        listTransactions();
    }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
        selectUpdateData,
        setSelectUpdateData,
        updateTransaction,
        loadingTransaction,
        loadingCreate,
        loadingUpdate,
        loadingDelete,
        selectDeleteId,
        setSelectDeleteId
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions deve ser usado dentro de TransactionProvider");
  }
  return context;
};