"use client";
import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import EditDialog from "./EditDialog";
import DeleteModal from "./DeleteDialog";
import { useStore } from "@/store/todo.store";
import Image from "next/image";
import checkCirclee from "@/assets/check-circle.svg";
import { motion, animate } from "framer-motion";

const HomePage = () => {
  const [editedIndex, setEditedIndex] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Completed" | "Incompleted">(
    "All"
  );
  const [creatingTask, setCreatingTask] = useState(false);
  const { items, updateItem, removeItem } = useStore();
  const [isEditUpdated, setIsEditUpdated] = useState(false);

  const handleEdit = (index: number) => {
    setEditedIndex(index);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (name: string) => {
    if (editedIndex !== null) {
      updateItem(editedIndex, { ...items[editedIndex], name });
    }
    setIsEditUpdated(true);
    setIsEditModalOpen(false);
    setTimeout(() => {
      setIsEditUpdated(false);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setEditedIndex(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const originalIndex = items.findIndex(
      (item) => item === filteredItems[index]
    );
    setEditedIndex(originalIndex);
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
    const originalIndex = items.findIndex(
      (item) => item === filteredItems[index]
    );
    const updatedItem = {
      ...items[originalIndex],
      completed: !items[originalIndex].completed,
    };
    updateItem(originalIndex, updatedItem);
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
  const handlePopupClose = () => {
    setIsEditUpdated(false); // Reset state when popup is closed
  };

  return (
    <>
      {isEditUpdated && (
        <motion.div id="container" className="edit-popup"  whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }} onClick={handlePopupClose}>
          <motion.p
            className="popup"
         
          >
            <Image src={checkCirclee} alt="checkcicrle" />
            <span>Edit successfully updated!</span>
          </motion.p>
        </motion.div>
      )}
      <TaskInput
        creatingTask={creatingTask}
        resetCreatingTask={() => setCreatingTask(false)}
      />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList
        filteredItems={filteredItems}
        toggleCompletion={toggleCompletion}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        onCreateTask={() => setCreatingTask(true)}
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
