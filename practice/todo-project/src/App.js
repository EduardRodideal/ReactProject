import React, {useContext} from "react";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";



export const App = () => {
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-4">
          <h3 className="text-capitalize text-center">todo input</h3>
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </div>
  );
};
