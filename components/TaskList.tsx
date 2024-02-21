"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import plusCircle from "@/assets/plus-circle.svg";
import checkCircle from "@/assets/check-circle.svg";
import checkCircleActiv from "@/assets/check-circle-active.svg";
import Loader from "@/components/Loader";

interface TaskListProps {
  filteredItems: any[];
  toggleCompletion: (index: number) => void;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  filteredItems,
  toggleCompletion,
  handleEdit,
  handleDelete,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  if (!filteredItems.length) {
    return (
      <div className="empty-tasks">
        <p className="empty-description">You don't have any items.</p>
        <Image className="img-circle" src={plusCircle} alt="circle" />
        <p className="create-text">Create Task</p>
      </div>
    );
  }

  return (
    <section id="container">
      <ul className="content">
        {filteredItems?.map((item, index) => (
          <li
            key={item.id}
            className={`new-task ${item.completed ? "completed" : ""}`}
          >
            <button className="btn-text">
              <Image
                src={item.completed ? checkCircleActiv : checkCircle}
                alt={item.completed ? "checkCircleActiv" : "check-circle"}
                onClick={() => toggleCompletion(index)}
                className="check-circle"
              />
              <span className="button-text">{item.name}</span>
            </button>
            <div className="button-edit-delete">
              <button className="btn-edit" onClick={() => handleEdit(index)}>
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TaskList;
