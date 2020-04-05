import React from "react";
import {TodoItem} from "./TodoItem";

export const TodoList = () => {
    const array = ["Salut", "Ce mai faceti", "Destul de bine"];
    const arrayItems = array.map(item => <TodoItem text={item} key={item} />);
    return (
        arrayItems
    )
}