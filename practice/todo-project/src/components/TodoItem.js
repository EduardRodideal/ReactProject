import React,{useContext} from "react";
import {FaPen, FaTrash} from "react-icons/fa";
import {ItemContext} from "../context";


export const TodoItem = ({title, id}) => {
    const value = useContext(ItemContext);
    const {handleDelete, handleEdit} = value;
  return (
    <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
        <h6>{title}</h6>
        <div className="todo-icon">
             <span className="mx-2 text-success">
                <FaPen onClick={() => handleEdit(id)} />
             </span>
             <span className="mx-2 text-danger">
                <FaTrash onClick={() => handleDelete(id)} />
             </span>
        </div>
    </li>
  );
};
