"use client";

import React, { useRef } from "react";
import { useStore } from "@/store/todo.store";

const TaskInput = () => {
  const inputRef = useRef<any>(null);
  const { addItem } = useStore();

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const newItemName = inputRef.current?.value.trim();
    if (newItemName) {
      const newItem = { id: Date.now(), name: newItemName, completed: false };
      addItem(newItem);
      inputRef.current!.value = "";
    }
  };

  return (
    <section id="container">
      <form onSubmit={handleSubmit} className="input-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write your task here..."
        />
        <div className="button-div">
          <button type="submit" className="btn-create">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskInput;
