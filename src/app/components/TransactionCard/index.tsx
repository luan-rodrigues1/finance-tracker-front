import { TransactionType } from "@/app/types/TransactionType"
import SettingsButton from "../SettingsButton"
import { useTransactions } from "@/app/Context/TransactionContext";

type TransactionCardProps = TransactionType & {
  handleModal: (type: "create" | "update" | "delete") => void
};

const TransactionCard = (transaction: TransactionCardProps) => {
    const { setSelectUpdateData, setSelectDeleteId } = useTransactions();

    return (
        <div 
          className={`min-h-16 bg-grey-1 border-l-4 ${transaction.isIncome ? "border-positive": "border-negative"} rounded-sm p-4 g-4 
                     transition-transform duration-200 ease-in-out 
                     hover:-translate-y-1 hover:shadow-md`}
        >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-grey-4 text-title3 font-bold">{transaction.description} - {new Date(transaction.date).toLocaleDateString("pt-BR")}</h2>
                    <span className="text-grey-3 text-body font-normal">{transaction.isIncome ? "Entrada" : "Despesa"}</span>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                    <p className={`${transaction.isIncome ? "text-positive": "text-negative"} text-body font-bold`}>
                        {transaction.amount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </p>
                    <div className="flex gap-2">
                        <SettingsButton title="Excluir" onClick={() => (setSelectDeleteId(transaction.id), transaction.handleModal("delete"))} />
                        <SettingsButton
                            title="Editar" 
                            onClick={
                                () => (transaction.handleModal("update"), 
                                setSelectUpdateData({
                                    id: transaction.id, 
                                    description: transaction.description, 
                                    amount: transaction.amount, 
                                    isIncome: transaction.isIncome, 
                                    date: transaction.date 
                                }))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard