import React, {Component} from 'react'
import Day from './Day'

class WeekDays extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        const daysToRender = []
        for (let i = 0; i < daysOfTheWeek.length; i++) {
            daysToRender.push(<Day day={daysOfTheWeek[i]} />)
        }
        return (
            <div className="week-days">
                {daysToRender}
            </div>
        )
    }
}

export default WeekDays