"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../Foms/InputField";
import SelectField from "../Foms/SelectField";
import PrimaryButton from "../PrimaryButton";
import DateField from "../Foms/DateField";
import { transactionSchema } from "../../schema/TransactionSchema";
import { useTransactions } from "@/app/Context/TransactionContext";

type TransactionFormData = {
  description: string;
  amount: number;
  type: "Receita" | "Despesa";
  date: Date;
};

type AddTransactionModalProps = {
  handleCreateModal: () => void;
};

const AddTransactionModal = ({ handleCreateModal }: AddTransactionModalProps) => {
  const { createTransaction } = useTransactions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
  });

  const onSubmit = async (data: TransactionFormData) => {
    const transactionToCreate = {
      description: data.description,
      amount: data.amount,
      isIncome: data.type === "Receita",
      date: data.date,
    };
    await createTransaction(transactionToCreate);
    handleCreateModal();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-grey-4/30 backdrop-blur-sm z-50"
      onClick={handleCreateModal}
    >
      <div
        className="bg-white rounded-lg p-4 w-[90%] max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title2 text-grey-4 font-bold">Nova transação</h2>
          <button
            onClick={handleCreateModal}
            className="text-grey-2 font-bold text-title2 hover:text-grey-4 transition-colors cursor-pointer"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            label="Descrição"
            placeholder="Digite aqui sua descrição"
            {...register("description")}
            error={errors.description?.message}
          />

            <InputField
                label="Valor (R$)"
                placeholder="Ex: 250,50"
                isMoney
                {...register("amount")}
                error={errors.amount?.message}
            />

          <SelectField
            label="Tipo de valor"
            options={[
              { value: "Receita", label: "Receita" },
              { value: "Despesa", label: "Despesa" },
            ]}
            {...register("type")}
            error={errors.type?.message}
          />

          <DateField
            label="Data da transação"
            {...register("date")}
            error={errors.date?.message}
          />

          <PrimaryButton
            title="Inserir transação"
            height="40"
            textSize="body"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;