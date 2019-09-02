import React, {Component} from 'react';
import './App.css';

class App extends Component {
 render () { 
  var helloWorld = 'Welcome to the Road to learn React domnule Rodideal' ;
  return (
    <div className="App">     
        <p>
          <h2>{helloWorld}</h2>
        </p>
        
    </div>
  );
 }
}

export default App;
