import React from 'react';
import './App.css';
import {TodoItem} from "./components/TodoItem";
import {MainComponent} from "./components/MainComponent";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {TodoList} from "./components/TodoList";

export const App = () => {
  return (
    <div style={{color: "white", textAlign: "center"}} className="todo-list">
      <TodoList />
    </div>
  );
}


