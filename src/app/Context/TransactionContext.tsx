"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CreateTransactionType, TransactionType } from "../types/TransactionType";
import GetAllTransactions from "../services/GetAllTransactions";
import CreateTransaction from "../services/CreateTransaction";
import DeleteTransaction from "../services/DeleteTransaction";

type TransactionContextType = {
  transactions: TransactionType[];
  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionType) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

type TransactionProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

    const fetchTransactions = async () => {
        const data = await GetAllTransactions();
        if (data) {
            setTransactions(data);
        }
    };

    const createTransaction = async (transaction: CreateTransactionType) => {
        try {
            await CreateTransaction(transaction);
            const updatedTransactions = await GetAllTransactions();
            if (updatedTransactions) {
                setTransactions(updatedTransactions);
            }
        } catch (err) {
            console.error("Erro ao criar transação:", err);
        }
    };

    const deleteTransaction = async (id: number) => {
        try {
            await DeleteTransaction(id);

            const updatedTransactions = await GetAllTransactions();
            if (updatedTransactions) {
                setTransactions(updatedTransactions);
            }
        
        } catch (err) {
            console.error("Erro ao criar transação:", err);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction
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