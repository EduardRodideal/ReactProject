import React, {Component} from 'react'
import DayOfWeek from './DayOfWeek'

class WeekDay extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        const daysOfWeek = []
        for (let i = 0; i < days.length; i++) {
            daysOfWeek.push(
                <DayOfWeek 
                    title={days[i]}
                    dataValue={i+1}
                    value={days[i]}
                />    
            )
        }
        return (
            <ul className="weekday">
                {daysOfWeek}
            </ul>
        )
    }
}


export default WeekDay