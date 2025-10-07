"use client";

import { useTransactions } from "@/app/Context/TransactionContext";
import { updateTransactionSchema } from "@/app/schema/TransactionSchema";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../Foms/InputField";
import SelectField from "../Foms/SelectField";
import DateField from "../Foms/DateField";
import PrimaryButton from "../PrimaryButton";
import { useEffect, useState } from "react";
import { formatDateForInput } from "@/app/utils/formatDateForInput ";
import { UpdateTransactionType } from "@/app/types/TransactionType";

type TransactionFormData = {
  description?: string;
  amount?: string;
  type?: "Receita" | "Despesa";
  date?: string | Date; 
};

type UpdateTransactionModalProps = {
  handleUpdateModal: () => void;
};
const UpdateTransactionModal = ({ handleUpdateModal }: UpdateTransactionModalProps)  => {
    const { selectUpdateData, updateTransaction } = useTransactions();
    const [updateId, setUpdateId] = useState<number>(0)
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<TransactionFormData>({
        resolver: yupResolver(updateTransactionSchema) as Resolver<TransactionFormData>,
        defaultValues: selectUpdateData
    ? {
        description: selectUpdateData.description || "",
        amount: selectUpdateData.amount?.toFixed(2).replace(".", ",") || "",
        type: selectUpdateData.isIncome ? "Receita" : "Despesa",
        date: selectUpdateData.date ? formatDateForInput(selectUpdateData.date) : "",
      }
    : {
        description: "",
        amount: "",
        type: undefined,
        date: "",
      },
    });

    useEffect(() => {
      if (selectUpdateData) {
        setUpdateId(selectUpdateData.id)
        reset({
          description: selectUpdateData.description,
          amount: selectUpdateData?.amount
          ? selectUpdateData.amount.toFixed(2).replace(".", ",")
          : "",
          type: selectUpdateData.isIncome ? "Receita" : "Despesa",
          date: selectUpdateData.date ? formatDateForInput(selectUpdateData.date) : "",
        });
      }
    }, [selectUpdateData, reset]);
  
    const onSubmit = async (data: TransactionFormData) => {
      const transactionToUpdate: UpdateTransactionType = {
        description: data.description,
        amount: Number(data.amount),
        isIncome: data.type === "Receita",
        date: data.date ? new Date(data.date) : undefined,
      };
      await updateTransaction(updateId ,transactionToUpdate);
      handleUpdateModal();
    };
    return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-grey-4/30 backdrop-blur-sm z-50"
      onClick={handleUpdateModal}
    >
      <div
        className="bg-white rounded-lg p-4 w-[90%] max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title2 text-grey-4 font-bold">Atualizar transação</h2>
          <button
            onClick={handleUpdateModal}
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
            title="Atualizar transação"
            height="40"
            textSize="body"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default UpdateTransactionModal