import { TransactionType } from "@/app/types/TransactionType"
import SettingsButton from "../SettingsButton"

const TransactionCard = ({trasaction}: TransactionType) => {
    return (
        <div 
          className="min-h-16 bg-grey-1 border-l-4 border-positive rounded-sm p-4 g-4 
                     transition-transform duration-200 ease-in-out 
                     hover:-translate-y-1 hover:shadow-md"
        >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-grey-4 text-title3 font-bold">Salário - Mês Dezembro</h2>
                    <span className="text-grey-3 text-body font-normal">Entrada</span>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                    <p className="text-positive text-body font-bold">R$ 6.660,00</p>
                    <div className="flex gap-2">
                        <SettingsButton title="Excluir"/>
                        <SettingsButton title="Editar"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard