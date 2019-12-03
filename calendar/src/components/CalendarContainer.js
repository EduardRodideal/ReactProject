import React, {Component} from 'react'
import '../App.css'
import Header from './Header'
import WeekDays from './WeekDays'

class CalendarContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="calendar"> 
                <p>This is the CalendarContainer</p>
                <Header />
                <WeekDays />
            </div>
        )
    }
}



export default CalendarContainer