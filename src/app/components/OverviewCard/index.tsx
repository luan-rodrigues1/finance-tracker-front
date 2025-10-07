import { useTransactions } from "@/app/Context/TransactionContext";

const OverviewCard = () => {
    const {transactions} = useTransactions();

    const totalBalance = transactions.reduce((acc, transaction) => {
        return transaction.isIncome
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);

    const formattedBalance = totalBalance.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });


    return (
        <div className="min-h-24 border-1 rounded-sm border-grey-2 p-4 flex justify-between">
            <div className="flex flex-col gap-3 text-grey-4">
                <h3 className="text-title3 font-bold">Valor total:</h3>
                <p className="text-body font-normal">O valor se refere ao saldo</p>
            </div>
            <div className="text-primary font-bold">
                <p>{formattedBalance}</p>
            </div>
        </div>
    )
}

export default OverviewCard