import React, {Component} from 'react'
import Months from './Months'
import WeekDay from './WeekDay'
import Days from './Days'

class RightColomn extends Component {
    constructor(props) {
        super(props) 
              
    }        

    render() {
        return (
            <div className="col rightCol">
                <div className="content">
                    <h2 className="year"> 
                    {this.props.selectedYear} 
                    <div>
                        <button 
                            className="decrease"
                            onClick={this.props.handleDecreaseClick}
                        >-</button>
                        <button 
                            className="increase"
                            onClick={this.props.handleIncreaseClick}
                        >+</button>                        
                    </div>
                    
                    </h2>                      
                    <Months
                        selectedMonth={this.props.selectedMonth} 
                        onClick={(id) => this.props.handleClick(id)}                   
                    />
                    <div className="clearfix"></div>   
                    <WeekDay />
                    <div className="clearfix"></div>   
                    <Days 
                        selectedDate={this.props.selectedDate} 
                        selectedMonth={this.props.selectedMonth} 
                        selectedYear={this.props.selectedYear}                         
                        onClick={this.props.onClick} 
                        todoList={this.props.todoList}                
                    />        
                </div>
            </div>
        )
    }
}

export default RightColomn