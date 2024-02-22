import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import EditDialog from "./EditDialog";
import DeleteModal from "./DeleteDialog";
import { useStore } from "@/store/todo.store";
import { useSnackbar } from 'notistack';
import checkCirclee from "@/assets/check-circle.svg";

const HomePage = () => {
  const [editedIndex, setEditedIndex] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Completed" | "Incompleted">("All");
  const [creatingTask, setCreatingTask] = useState(false);
  const { items, updateItem, removeItem } = useStore();
  const { enqueueSnackbar } = useSnackbar(); 

  const handleEdit = (index: number) => {
    setEditedIndex(index);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (name: string) => {
    if (editedIndex !== null) {
      updateItem(editedIndex, { ...items[editedIndex], name });
    }
    setIsEditModalOpen(false);
    const message = 'You have successfully edit the task'
    enqueueSnackbar(message, { autoHideDuration: 3000, variant:"success" })
  };

  const handleCancelEdit = () => {
    setEditedIndex(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const originalIndex = items.findIndex((item) => item === filteredItems[index]);
    setEditedIndex(originalIndex);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (editedIndex !== null) {
      removeItem(editedIndex);
      setEditedIndex(null);
    }
    setIsDeleteModalOpen(false);
    const message = 'You have successfully delete the task'
    enqueueSnackbar(message, { autoHideDuration: 3000, variant:"info" })
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleCompletion = (index: number) => {
    const originalIndex = items.findIndex((item) => item === filteredItems[index]);
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

  return (
    <>
      
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
