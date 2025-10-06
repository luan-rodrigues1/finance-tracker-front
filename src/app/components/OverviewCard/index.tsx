const OverviewCard = () => {
    return (
        <div className="min-h-24 border-1 rounded-sm border-grey-2 p-4 flex justify-between">
            <div className="flex flex-col gap-3 text-grey-4">
                <h3 className="text-title3 font-bold">Valor total:</h3>
                <p className="text-body font-normal">O valor se refere ao saldo</p>
            </div>
            <div className="text-primary font-bold">
                <p>R$ 8184,00</p>
            </div>
        </div>
    )
}

export default OverviewCard