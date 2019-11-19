
//putem schimba dinamic styles adauga culori, background si altele
function App1() {
    const date = new Date(2019, 11, 12, 13);
    const hours = date.getHours();
    let timeOfDay;
    const styles = {
      fontSize: 30
    }
  
    if (hours < 12) {
      timeOfDay = "morning";
      styles.color = "#D90000";
    } else if (hours >= 12 && hours <= 17) {
      timeOfDay = "afternoon";
      styles.color = "#8914A3";
    } else {
      timeOfDay = "night";
      styles.color = "#04756F"
    }
  
    return (
      <h1 style={styles}>Good {timeOfDay}</h1>
    );
}/////////////////////////////end function App1()

//in loc de mai multe props putem trimite un singur obiect care sa contina in interior toate props
////////////////////////////////////
function App2() {
    return (
      <div className="contacts">
        <ContactCards 
          contact={ {name: "Mr. Nicu", imgUrl: "http://placekitten.com/300/150", phone: "(214) 456-47896", email: "nicutu@gmail.com"}}
        />       
      </div>
      
    );
}

//in loc sa folosim props direct folosim valorile unui obiect din props
function ContactCards(props) {
    return (
        <div className="contact-cards">
            <img src={props.contact.imgUrl} />
            <h3>Name: {props.contact.name}</h3>
            <p>Phone: {props.contact.phone} </p>
            <p>Email: {props.contact.email} </p>
        </div>
    )
}
//////////////////////// end function App2()

// alte midalitati de inLine style ternary operator
function App3() {
    return (
      <div>
        <Joke 
          question="What's the best thing about Switzerland" 
          punchLine="I don't know, but the flag is a big plus" 
        />        
      </div>
    )
}
  
function Joke(props) {
    return (
        <div>
            {/* <h3 style={{display: props.question ? "block" : "none"}}>Question: {props.question} </h3> */}
            <h3 style={{display: !props.question && "none"}}>Question: {props.question} </h3>
            <h3 style={{color: !props.question && "green"}}>Answer: {props.punchLine} </h3>
            <hr />
            <br/>
        </div>
    )
}
///////////////////end function App3()

//despre map si array of components in JSX
function App4() {
    // const jokeComponents =  jokesData.map(joke => {
    //   return (
    //     <Joke question={joke.question} punchLine={joke.punchLine} />
    //   )
    // })
  
    const jokeComponents = jokesData.map(joke => <Joke key={joke.id} question={joke.question} punchLine={joke.punchLine} />)
  
    return (
      <div>
        {jokeComponents}
      </div>
    )
}

const jokesData = [
    {
        id: 1,
        punchLine: "It's hard to explain puns to kleptomaniacs because they take things literally"
    },
    {
        id: 2,
        question: "What's the best thing about Switzerland", 
        punchLine: "I don't know, but the flag is a big plus" 
    },    
    {
        id: 3,
        question: "Did you hear about the mathematician who's afraid of negative numbers?",
        punchLine: "He'll stop at nothing to avoid them!" 
    },
    {
        id: 4, 
        question: "Hear about the new restaurant called Karma?", 
        punchLine: "There's no menu: you get what you deserve."
    },
    {
        id: 5,
        question: "Did you hear about the actor who fell through the floorboards?", 
        punchLine: "He was just going through a stage" 
    },
    {
        id: 6,
        question:"Did you hear about the claustrophobic astronaut?", 
        punchLine: "He just needed a little space" 
    }
]//end function App4()

//despre handleClick si modificarea la state
class App6 extends React.Component {
    constructor() {
      super()
      this.state = {
        count: 0
      }
      this.handleClick = this.handleClick.bind(this)
      this.handleClickDouble = this.handleClickDouble.bind(this)
      this.handleClickHalf = this.handleClickHalf.bind(this)
      this.handleClickReturnToZero = this.handleClickReturnToZero.bind(this)
    }
  
    handleClick() {
      this.setState(prevState => {
        return {
          count: prevState.count + 1
        }
      })
    }
  
    handleClickDouble() {
        this.setState(prevState => {
            return {
                count: prevState.count * 2
            }
        })
    }
  
    handleClickHalf() {
      this.setState(prevState => {
        return {
          count: prevState.count / 2
        }
      })
    }
  
    handleClickReturnToZero() {
      this.setState(() => {
        return {
          count: 0
        }
      })
    }
  
    render() {
      return (
        <div className="todo-list">
          <h1>{this.state.count}</h1>
          <button onClick={this.handleClick}>Increase by one!</button>
          <br />
          <button onClick={this.handleClickDouble}>Double the number</button>
          <br />
          <button onClick={this.handleClickHalf}>Half the number</button>
          <br />
          <button onClick={this.handleClickReturnToZero}>Return to zero</button>
        </div>
      )
    }  
}// end class App6 extends React.Component


//cum se transmit metodele handleChange, handleClick etc...
class App7 extends React.Component {
    constructor() {
      super()
      this.state = {
        todosData: todosData
      }
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(id ) {
      this.setState(prevState => {
        const todosData = prevState.todosData.map(item => {
          if (item.id === id) {
            item.completed = !item.completed
          }
          return item;
        })
        return {
          todosData: todosData
        }
      })
      // this.setState(prevState => {
      //   const todosData = prevState.todosData;
      //   todosData[id-1].completed = !todosData[id-1].completed
      //   return {
      //     todosData: todosData
      //   }
      // })
    }
  
    render() {
      const todoItems = this.state.todosData.map(item => <TodoItem key={item.id} item={item} handleChange={(id) => this.handleChange(id)} />)
      return (
        <div className="todo-list"> 
          {todoItems}
        </div>
      )
    }
}

function TodoItem(props) {
    return (
        <div className="todo-item">
            <input type='checkbox' name='Mere' checked={props.item.completed} onChange={() => props.handleChange(props.item.id)} />
            <p>{props.item.text}</p>                       
        </div>
    );
}
//end class App7 extends React.Component

class App8 extends Component {
    constructor() {
      super()
      this.state = {}
    }
  
    // componentWillMount() {
    //   //deprecated
    // }
  
    // componentWillUpdate() {
    //   //deprecated
    // }
  
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.whatever !== this.props.whatever) {
    //     // do something important here
    //     //deprecated
    //   }
    // }
  
  
    componentDidMount() {
      // GET the data i need to correctly display
    }
  
    
  
    shouldComponentUpdate(nextProps, nextState) {
      //return true if want it to update
      //return false if not
    }
  
    componentWillUnmount() {
      //remove event listener
      //teardown or cleanup your code before your component disappears
    }
  
    static getDerivedStateFromProps(props, state) {
      // return the new, updated state based on the props
    }
  
    getSnapshotBeforeUpdate() {
      //create a backup of the current way things are
    }
  
    render() {
      return (
        <div>
          Code goes here
        </div>
      )
    }
}//end class App8 extends Component

//metoda componentDidMount
class App9 extends Component {
    constructor() {
      super()
      this.state = {
        isLoading: true
      }
    }
  
    componentDidMount() {
      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 1500)
    }
  
    render() {
      return (
        <div>
          <Conditional isLoading={this.state.isLoading} />
        </div>
      )
    }
}

function Conditional(props) {
    const sentenceToDisplay = props.isLoading ? "Loading...." : "Some good stuff aboud conditional rendering"
    
    return (
        <h1>{sentenceToDisplay}</h1>
    )
    
}
// end class App9 extends Component

//folosirea lui && in loc do operatorul ternar
class App10 extends Component {
    constructor() {
      super()
      this.state = {
        unreadMessages: [
          "Call your mam",
          "New spam email available. All links are definitely safe to click."
        ]
      }
    }
    render() {
      return (
        <div> 
        { 
          this.state.unreadMessages.length > 0 &&
          <h2>You have {this.state.unreadMessages.length} unread messages</h2>
        }
        </div>
      )
    }
}// end class App10 extends Component


class App11 extends Component {
    constructor() {
      super()
      this.state = {
        isLoggedIn: false
      }
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick() {
     this.setState(prevState => {
       return {
         isLoggedIn: !prevState.isLoggedIn
       }
     })   
    }
  
    render(){
      const loggedMessage = this.state.isLoggedIn ? "The user is logged in" : "The user is logged out";
      const buttonMessage = this.state.isLoggedIn ? "LOG OUT" : "LOG IN";
      return (
        <div className="todo-list">
          <h1>{loggedMessage}</h1>
          <button onClick={this.handleClick}>{buttonMessage}</button>
        </div>
      )
    }
}//end class App11 extends Component

class App12 extends Component {
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

function TodoItem(props) {
    const styles = {}
    if (props.item.completed) {
        styles.color = "green"
    } else {
        styles.color = "red"
    }
    return (
        <div className="todo-item">
            <input type='checkbox' name='Mere' checked={props.item.completed} onChange={() => props.handleChange(props.item.id)} />
            <p style={styles}>{props.item.text}</p>                       
        </div>
    );
}

//a doua varianta
function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "green",
        textDecoration: "line-through"
    }
    let styles = {}
    if (props.item.completed) {
        styles = completedStyle
    } else {
        styles.color = "red"
    }
    return (
        <div className="todo-item">
            <input type='checkbox' name='Mere' checked={props.item.completed} onChange={() => props.handleChange(props.item.id)} />
            <p style={styles}>{props.item.text}</p>                       
        </div>
    );
}

//a treia varianta
function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "green",
        textDecoration: "line-through"
    }
    
    return (
        <div className="todo-item">
            <input type='checkbox' name='Mere' checked={props.item.completed} onChange={() => props.handleChange(props.item.id)} />
            <p style={props.item.completed ? completedStyle : null}>{props.item.text}</p>                       
        </div>
    );
}
//end class App12 extends Component