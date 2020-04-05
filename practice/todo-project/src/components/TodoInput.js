import React, { useContext } from "react";
import { FaBook } from "react-icons/fa";
import { ItemContext } from "../context";

export const TodoInput = () => {
  const value = useContext(ItemContext);
  const { item, handleChange, handleSubmit, editItem } = value;
  const addOrEdit = editItem ? (
    <button type="submit" className="btn btn-block btn-success mt-3">
      edit item
    </button>
  ) : (
    <button type="submit" className="btn btn-block btn-primary mt-3">
      add item
    </button>
  );
  return (
    <div className="card card-body my-3">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text bg-primary text-white">
              <FaBook />
            </div>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="add a todo item"
            value={item.value}
            onChange={handleChange}
          />
        </div>
        {addOrEdit}
      </form>
    </div>
  );
};
