import React, { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { ItemContext } from "../context";
import { v4 as uuidv4 } from "uuid";

export const TodoList = () => {
  const value = useContext(ItemContext);
  const { items, handleClear } = value;  
  const todoItems = items.map(item => (
    <TodoItem key={item.id} title={item.value} id={item.id} />
  ));
  return (
    <ul className="list-group my-5">
      <h3 className="text-capitalize text-center">todo list</h3>
      {todoItems}
      <button
        type="button"
        className="btn btn-danger btn-block text-capitalize mt-5"
        onClick={handleClear}
      >
        clear list
      </button>
    </ul>
  );
};
