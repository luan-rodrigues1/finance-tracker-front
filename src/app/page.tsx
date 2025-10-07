"use client";
import { useState } from "react";
import AddTransactionModal from "./components/AddTransactionModal";
import OverviewCard from "./components/OverviewCard";
import TransactionsList from "./components/TransactionsList";
import { useTransactions } from "./Context/TransactionContext";

export default function Home() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { transactions } = useTransactions();

  const handleModal = (type: "create" | "update") => {
    if (type === "create") {
      setOpenAddModal(!openAddModal);
    }

    if (type === "update") {
      setOpenUpdateModal(!openUpdateModal);
    }
  };

  return (
    <main className="relative">
      <div className="flex flex-col gap-4 w-[90%] mx-auto max-w-[500px] mt-4">
        <OverviewCard/>
        <TransactionsList transactions={transactions} handleCreateModal={() => handleModal("create")} />
        {openAddModal && (
          <AddTransactionModal handleCreateModal={() => handleModal("create")} />
        )}
      </div>
    </main>
  );
}
