import React, {Component} from 'react'
import todosData from './components/todosData'
import TodoItem from './components/TodoItem'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todosData: todosData
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id) {
    this.setState(prevState => {
      const todosDataChanged = prevState.todosData.map(item => {
        if (item.id === id) {
          item.completed = !item.completed
        } 
        return item
      })
      return {
        todosData: todosDataChanged
      }
    })
  }

  render() {
    const todosItem = this.state.todosData.map(item => <TodoItem key={item.id} item={item} handleChange={(id) => this.handleChange(id)} />)
    return (
      <div className="todo-list">
        {todosItem}
      </div>
    )
  }
}

export default App