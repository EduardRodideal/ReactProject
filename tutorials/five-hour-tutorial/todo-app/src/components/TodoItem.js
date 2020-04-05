import React from "react";

export const TodoItem = ({text}) => {
  return (
    <div className="todo-item" >
      <label htmlFor={text}>mere</label>
      <input id={text} type="checkbox" value="cumpar mere" />
      <p>{text}</p>
    </div>
  );
};
