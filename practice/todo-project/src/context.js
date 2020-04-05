import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const ItemContext = createContext();

export const ItemContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ id: 1, value: "" });
  const [editItem, setEditItem] = useState(false);
  const [id, setId] = useState(null);

  const handleChange = event => {
    const id = uuidv4();
    const value = event.target.value;
    setItem({ id, value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (item.value === "") {
        return
    }
    const edit = items.find(element => (element.id === id));
    let newItems = [];
    if (edit) {
      newItems = items.map(element => {
        if (element.id === id) {
          element = item;
          return element;
        }
        return element;
      });
      setItem({ value: "" });
      setItems(newItems);
    } else {
      const tempItems = [...items, item];
      setItem({ value: "" });
      setItems(tempItems);
    }
    setEditItem(false);
  };

  const handleDelete = id => {
    const tempItems = items.filter(item => item.id !== id);
    setItems(tempItems);
  };

  const handleEdit = id => {
    const newItem = items.find(element => element.id === id);
    console.log("new item", newItem);
    setItem(newItem);
    setId(id);
    setEditItem(true);
  };

  const handleClear = () => {
      setItems([]);
  }
  return (
    <ItemContext.Provider
      value={{
        items,
        item,
        editItem,
        handleChange,
        handleSubmit,
        handleDelete,
        handleEdit,
        handleClear
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
