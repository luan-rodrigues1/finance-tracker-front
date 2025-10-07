"use client";
import { useState } from "react";
import AddTransactionModal from "./components/AddTransactionModal";
import OverviewCard from "./components/OverviewCard";
import TransactionsList from "./components/TransactionsList";
import UpdateTransactionModal from "./components/UpdateTransactionModal";
import DeleteModal from "./components/DeleteModal";

export default function Home() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleModal = (type: "create" | "update" | "delete") => {
    if (type === "create") {
      setOpenAddModal(!openAddModal);
    }

    if (type === "update") {
      setOpenUpdateModal(!openUpdateModal);
    }

    if (type === "delete"){
      setOpenDeleteModal(!openDeleteModal);
    }
  };

  return (
    <main className="relative">
      <div className="flex flex-col gap-4 w-[90%] mx-auto max-w-[500px] mt-4">
        <OverviewCard/>
        <TransactionsList handleModal={handleModal}  />
        {openAddModal && (
          <AddTransactionModal handleCreateModal={() => handleModal("create")} />
        )}
        {openUpdateModal && (
          <UpdateTransactionModal handleUpdateModal={() => handleModal("update")} />
        )}
        {openDeleteModal && (
          <DeleteModal handleDeleteModal={() => handleModal("delete")} />
        )}
      </div>
    </main>
  );
}
