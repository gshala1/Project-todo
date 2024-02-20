"use client";
import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import EditDialog from "./EditDialog";
import DeleteModal from "./DeleteDialog";
import { useStore } from "@/store/todo.store";

const HomePage = () => {
  const [editedIndex, setEditedIndex] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Completed" | "Incompleted">(
    "All"
  );
  const { items, updateItem, removeItem } = useStore();

  const handleEdit = (index: number) => {
    setEditedIndex(index);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (name: string) => {
    if (editedIndex !== null) {
      updateItem(editedIndex, { ...items[editedIndex], name });
    }
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditedIndex(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (index: number) => {
    setEditedIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (editedIndex !== null) {
      removeItem(editedIndex);
      setEditedIndex(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleCompletion = (index: number) => {
    const updatedItem = { ...items[index], completed: !items[index].completed };
    updateItem(index, updatedItem);
  };

  const filteredItems = items.filter((item) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Completed") {
      return item.completed;
    } else if (filter === "Incompleted") {
      return !item.completed;
    }
  });

  return (
    <>
      <TaskInput />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList
        filteredItems={filteredItems}
        toggleCompletion={toggleCompletion}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <EditDialog
        open={isEditModalOpen}
        handleClose={handleCancelEdit}
        handleSave={handleSaveEdit}
        initialName={editedIndex !== null ? items[editedIndex].name : ""}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={handleCancelDelete}
        handleDelete={handleConfirmDelete}
      />
    </>
  );
};

export default HomePage;
