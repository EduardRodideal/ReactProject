import React, {Component} from 'react'



class LeftContent extends Component {
    constructor(props) {
        super(props)
    }

    getDayOfTheWeek() {
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const date = new Date(this.props.selectedYear, this.props.selectedMonth, this.props.selectedDate)
        const day = date.getDay();
        return (week[day])
    }

    getMonth() {
        const months = ["January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"]
        return (months[this.props.selectedMonth])
    }

    render() {
        return (
            <h1 className="date">
                {this.getDayOfTheWeek()}
                <span>{this.getMonth()} {this.props.selectedDate}th</span>
            </h1>
        )
    }
}


export default LeftContent