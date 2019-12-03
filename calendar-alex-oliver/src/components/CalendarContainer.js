import React, {Component} from 'react'
import LeftColomn from './LeftColomn'
import RightColomn from './RightColomn'

class CalendarContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date().getDate(),
            selectedMonth: new Date().getMonth(), 
            selectedYear: new Date().getFullYear(),            
            itemTodo: "",
            toDoList: {
                [new Date().getDate() - 1 + '' + new Date().getMonth() + new Date().getFullYear()]: 
                    ["ordine in casa", "mancare la oi", "inot la bazin"],
                '3112019': ["primul lucru", "aldoilea lucru", "al treilea lucru"],

            }
        }
        this.handleCLick = this.handleClick.bind(this)
        this.handleIncreaseClick = this.handleIncreaseClick.bind(this)
        this.handleDecreaseClick = this.handleDecreaseClick.bind(this)
        this.hanldeClickDay = this.handleClickDay.bind(this)
        this.handleClickRemove = this.handleClickRemove.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAddItemClick = this.handleAddItemClick.bind(this)
    }

    handleClickDay(id) {
        this.setState({
            selectedDate: id
        })
    }

    handleClick(id) {               
        this.setState({
            selectedMonth: id - 1
        })
    }

    handleIncreaseClick() {
        this.setState({
            selectedYear: this.state.selectedYear + 1
        })
    }

    handleDecreaseClick() {
        this.setState({
            selectedYear: this.state.selectedYear - 1
        })
    }

    handleClickRemove(itemToRemove) {
        let selectedDay = this.state.selectedDate + '' + this.state.selectedMonth + this.state.selectedYear        
        let toDoList = this.state.toDoList
        let dayFromToRemove = toDoList[selectedDay]        
        let index = dayFromToRemove.indexOf(itemToRemove)
        dayFromToRemove.splice(index, 1)
        toDoList[selectedDay] = dayFromToRemove
        this.setState({
            toDoList: toDoList
        })       

    }

    handleChange(event) {
        const value = event.target.value
        this.setState({
            itemTodo: value
        })
    }

    handleAddItemClick() {
        if(this.state.itemTodo.length === 0) {
            return
        }
        const dayWhithItems = this.state.selectedDate + '' + this.state.selectedMonth + this.state.selectedYear
        let todoList = this.state.toDoList        
        if (!todoList.hasOwnProperty(dayWhithItems)) {            
            todoList[dayWhithItems] = [this.state.itemTodo]
            this.setState({
                itemTodo: "",
                toDoList: todoList
            })
        } else {
            const currentTodoList = todoList[dayWhithItems]
            currentTodoList.push(this.state.itemTodo)
            todoList[dayWhithItems] = currentTodoList
            this.setState({
                itemTodo: "",
                toDoList: todoList
            })
        }
    }


    render() {
        return (
            <div className="calendar">
                <LeftColomn 
                    toDoList={this.state.toDoList}
                    selectedDate={this.state.selectedDate}
                    selectedMonth={this.state.selectedMonth}
                    selectedYear={this.state.selectedYear}
                    onClick={(itemToRemove) => this.handleClickRemove(itemToRemove)}
                    itemTodo={this.state.itemTodo}
                    onChange={this.handleChange}
                    handleAddItemClick={this.handleAddItemClick}
                />
                <RightColomn 
                    handleClick={(id) => this.handleClick(id)}
                    handleIncreaseClick={this.handleIncreaseClick}
                    handleDecreaseClick={this.handleDecreaseClick} 
                    selectedDate={this.state.selectedDate}
                    selectedMonth={this.state.selectedMonth} 
                    selectedYear={this.state.selectedYear} 
                    onClick={(id) => this.handleClickDay(id)} 
                    todoList={this.state.toDoList} 
                              
                />
            </div>
        )
    }
}


function erase() {
    let array = [0, 1, 2, 3, 4]
    let index = array.indexOf(2)
    array.splice(index,1)
    return (array)
    //console.log(erase())
}

function has() {
    const object = {
        selectedDate: new Date().getDate(),
        selectedMonth: new Date().getMonth(), 
        selectedYear: new Date().getFullYear(), 
        selectedWeek: new Date().getDay(),
        newDate: new Date("2019", "11", "3"),
    }
    return (object)
    //console.log(has())
        
}





export default CalendarContainer