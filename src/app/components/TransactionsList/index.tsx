import { TransactionType } from "@/app/types/TransactionType";
import PrimaryButton from "../PrimaryButton"
import TransactionCard from "../TransactionCard"

type TransactionsListProps = {
    transactions: TransactionType[]
  handleCreateModal: () => void;
};


const TransactionsList = ({transactions, handleCreateModal}: TransactionsListProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-title3 text-grey-4 font-bold">Lista de Transações</h2>
                <PrimaryButton title="Adicionar" width="50" height="20" textSize="title4"  onClick={handleCreateModal} />
            </div>
            {transactions.length === 0 ? (
                <p className="text-grey-3 text-body text-center">Nenhuma transação encontrada.</p>
            ) : (
                <ul className="flex flex-col gap-4">
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                    <TransactionCard {...transaction} />
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}

export default TransactionsList