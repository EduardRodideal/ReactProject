import React from 'react';
import '../App.css';

function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "green",
        textDecoration: "line-through"
    }
    
    return (
        <div className="todo-item">
            <input type='checkbox' name='Mere' checked={props.item.completed} onChange={() => props.handleChange(props.item.id)} />
            <p style={props.item.completed ? completedStyle : null}>{props.item.text}</p>                       
        </div>
    );
}




export default TodoItem;