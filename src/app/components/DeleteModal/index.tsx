"use client";

import { useTransactions } from "@/app/Context/TransactionContext";
import PrimaryButton from "../PrimaryButton";

type DeleteModalProps = {
  handleDeleteModal: () => void;
};

const DeleteModal = ({
    handleDeleteModal,
}: DeleteModalProps) => {
    const { loadingDelete, deleteTransaction, selectDeleteId } = useTransactions();

    const submitDelete = async () => {
        await deleteTransaction(selectDeleteId)
        handleDeleteModal()
    }

    return (
        <div
        className="fixed inset-0 flex justify-center items-center bg-grey-4/30 backdrop-blur-sm z-50"
        onClick={() => handleDeleteModal()}
        >
        <div
            className="bg-white rounded-lg p-4 w-[90%] max-w-sm shadow-lg"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-title2 text-grey-4 font-bold">Deletar transação?</h2>
            <button
                onClick={() => handleDeleteModal()}
                className="text-grey-2 font-bold text-title2 hover:text-grey-4 transition-colors cursor-pointer"
            >
                X
            </button>
            </div>
            <div className="flex justify-end gap-2 mt-4">
            <PrimaryButton
                title="Cancelar"
                height="40"
                textSize="body"
                onClick={() => handleDeleteModal()}
            />
            <PrimaryButton
                title="Confirmar"
                height="40"
                textSize="body"
                onClick={() => submitDelete()}
                isLoading={loadingDelete}
            />
            </div>
        </div>
        </div>
    );
};

export default DeleteModal;