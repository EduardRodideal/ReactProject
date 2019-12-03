import React, {Component} from 'react'

class LeftNotes extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let selectedDay = this.props.selectedDate + '' + this.props.selectedMonth + this.props.selectedYear        
        const agenda = this.props.toDoList[selectedDay]
        const agendaLi = []
        if (agenda !== undefined) {
            for (let i = 0; i < agenda.length; i++) {
                agendaLi.push(
                    <li key={agenda[i]}>
                        {agenda[i]}
                        <a 
                            href="#" 
                            title="Remove note" 
                            className="removeNote animate"
                            onClick={() => this.props.onClick(agenda[i])}
                        >x</a>
                    </li>
                )
            }
        }
        
        return (
            <div className="notes">
                <p>
                    <input 
                        type="text" 
                        placeholder="New note" 
                        value={this.props.itemTodo}
                        onChange={this.props.onChange}
                    />
                    <a 
                        href="#" 
                        title="Add note" 
                        className="addNote animate"
                        onClick={this.props.handleAddItemClick}
                    >+</a>
                </p>
                <ul className="noteList">
                    {agendaLi}
                </ul>
            </div>
        )
    }
}


export default LeftNotes