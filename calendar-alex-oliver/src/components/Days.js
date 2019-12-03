import React, {Component} from 'react'
import DayOfMonth from './DayOfMonth'

class Days extends Component {
    constructor(props) {
        super(props)
              
    }    

    //cate zile are luna transmisa la parametru month
    getNumberOfDays(year, month, day) {
        const data = new Date(year, month, day)
        return data.getDate()
    }

    //in ce zi din week cade data de 1. e 0 este Sunday, 1 Monday ...
    getDayOfTheWeek(year, month, day) {
        const data = new Date(year, month, day)
        return data.getDay()
    }

    //in week in care cade data de 1, cate zile din luna trecuta sunt
    getDaysFromLastMonth(numberDaysLastMonth, dayOfTheWeek) {
        if (dayOfTheWeek === 0) {
            dayOfTheWeek = 7
        }
        let daysFromLastMonth = []
        for (let i = 0; i < dayOfTheWeek - 1; i++) {
            daysFromLastMonth.push(numberDaysLastMonth - i)
        }
        return daysFromLastMonth.reverse()
    }

    getDaysWhithItems(){
        const numberDaysCurrentMonth = this.getNumberOfDays(this.props.selectedYear, this.props.selectedMonth +1, 0)
        const keysForToDoList = []
        for (let i = 1; i <= numberDaysCurrentMonth; i++) {
            const key = i + '' + this.props.selectedMonth + this.props.selectedYear
            keysForToDoList.push(key)
        }

        const daysWhithItems = []
        for (let i = 0; i < keysForToDoList.length; i++) {
            const todoList = this.props.todoList
            if (todoList.hasOwnProperty(keysForToDoList[i])) {
                const hasItems = todoList[keysForToDoList[i]].length > 0
                if (hasItems) {
                    daysWhithItems.push(i+1)
                }
            }
            
        }
        return (daysWhithItems)
    }



    render() {
        const numberDaysCurrentMonth = this.getNumberOfDays(this.props.selectedYear, this.props.selectedMonth +1, 0) 
        const numberDaysLastMonth = this.getNumberOfDays(this.props.selectedYear, this.props.selectedMonth, 0) 
        const dayOfTheWeek = this.getDayOfTheWeek(this.props.selectedYear, this.props.selectedMonth, 1)
        const daysFromLastMonth = this.getDaysFromLastMonth(numberDaysLastMonth, dayOfTheWeek)             
        const days = []        
        for (let i = 0; i < daysFromLastMonth.length; i++) {            
            days.push(
                <DayOfMonth 
                    title={daysFromLastMonth[i]}
                    dataValue={daysFromLastMonth[i]}
                    value={daysFromLastMonth[i]}
                    onClick={this.props.onClick}
                    className="daylastmonth"
                />
            )

        }
        const event = this.getDaysWhithItems()        
        for (let i = 1; i <= numberDaysCurrentMonth; i++) {            
            if (event.includes(i) && i === this.props.selectedDate) {
                days.push(
                    <DayOfMonth 
                        title={i}
                        dataValue={i}
                        value={i}
                        className="selected"
                        onClick={this.props.onClick}
                    />
                )
                
            } else if(event.includes(i)) {
                days.push(
                    <DayOfMonth 
                        title={i}
                        dataValue={i}
                        value={i}
                        className="event"
                        onClick={this.props.onClick}
                    />
                )
            } else if (i === this.props.selectedDate) {
                days.push(
                    <DayOfMonth 
                        title={i}
                        dataValue={i}
                        value={i}
                        className="selected"
                        onClick={this.props.onClick}
                    />
                )
            } else {
                days.push(
                    <DayOfMonth 
                        title={i}
                        dataValue={i}
                        value={i}
                        onClick={this.props.onClick}
                    />
                ) 
            }
            
        }
        return (
            <ul className="days">
                {days}
            </ul>
        )
    }
}


export default Days