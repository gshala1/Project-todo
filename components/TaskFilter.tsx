"use client";
import React from "react";

interface TaskFilterProps {
  filter: "All" | "Completed" | "Incompleted";
  setFilter: (filter: "All" | "Completed" | "Incompleted") => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  return (
    <section id="container">
      <div className="all-button">
        <button
          onClick={() => setFilter("All")}
          className={filter === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={filter === "Completed" ? "active" : ""}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("Incompleted")}
          className={filter === "Incompleted" ? "active" : ""}
        >
          Incompleted
        </button>
      </div>
    </section>
  );
};

export default TaskFilter;
