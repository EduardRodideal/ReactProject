import React, {Component} from 'react'
import Month from './Month'

class Months extends Component {
    constructor(props) {
        super(props)        
    }
    

    render() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        const liMonths = []              
        for (let i = 0; i < months.length; i++) {  
            if (i === this.props.selectedMonth) {
                liMonths.push(
                    <Month 
                        key={months[i]}
                        title={months[i]}
                        dataValue={i+1}
                        month={months[i]}
                        className="selected"
                        //onClick={(id) => this.handleClick(id)}
                        onClick={(id) => this.props.onClick(id)}
                    />
                )
            } else {
                liMonths.push(
                    <Month 
                        key={months[i]}
                        title={months[i]}
                        dataValue={i+1}
                        month={months[i]}
                        //onClick={this.handleClick}
                        onClick={(id) => this.props.onClick(id)}
                    />
                )
            }          
            
            
            
        }
        return (
            <ul className="months">
                {liMonths}
            </ul>
        )
    }
}

export default Months