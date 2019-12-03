import React, {Component} from 'react'
import LeftContent from './LeftContent'
import LeftNotes from './LeftNotes'

class LeftColomn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col leftCol">
                <LeftContent 
                    selectedDate={this.props.selectedDate}
                    selectedMonth={this.props.selectedMonth}
                    selectedYear={this.props.selectedYear}
                />
                <LeftNotes 
                    toDoList={this.props.toDoList}
                    selectedDate={this.props.selectedDate}
                    selectedMonth={this.props.selectedMonth}
                    selectedYear={this.props.selectedYear}
                    onClick={this.props.onClick}
                    itemTodo={this.props.itemTodo}
                    onChange={this.props.onChange}
                    handleAddItemClick={this.props.handleAddItemClick}
                />
            </div>
        )
    }
}

export default LeftColomn