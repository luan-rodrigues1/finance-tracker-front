"use client";
import PrimaryButton from "../PrimaryButton"
import TransactionCard from "../TransactionCard"
import { useTransactions } from "@/app/Context/TransactionContext";

type TransactionsListProps = {
    handleModal: (type: "create" | "update" | "delete") => void;
};


const TransactionsList = ({ handleModal }: TransactionsListProps) => {
  const { transactions, loadingTransaction } = useTransactions();

  if (loadingTransaction) {
    return (
        <div className="flex justify-center items-center gap-2 py-10">
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-title3 text-grey-4 font-bold">Lista de Transações</h2>
        <PrimaryButton
          title="Adicionar"
          width="50"
          height="20"
          textSize="title4"
          onClick={() => handleModal("create")}
        />
      </div>

      {transactions.length === 0 ? (
        <p className="text-grey-3 text-body text-center">Nenhuma transação encontrada.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <TransactionCard
                {...transaction}
                handleModal={handleModal}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionsList