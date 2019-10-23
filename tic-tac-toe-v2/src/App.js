import React from 'react';
//import logo from './logo.svg';
import './App.css';

var counterJump = 0;
var counterClick = 0;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SquareWinner(props) {
  return (
    <button className="square-winner">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]} onClick={() => {this.props.onClick(i)}} />
    );
  }

  renderSquareWinner(i) {
    return (
      <SquareWinner value={this.props.squares[i]} />
    );
  }

  

  render() {
    const winningSquares = calculateWinningSquares(this.props.squares);
    const board = [];
    let row = []; 
    let redRow = false;  
    for (let i = 0; i < 9; i+=3) {
     for (let j = 0; j < 3; j++) {
       if (winningSquares) {
         for (let k = 0; k < winningSquares.length; k++) {
           if ((i + j) === winningSquares[k]) {                        
             row.push(this.renderSquareWinner(i + j));
             redRow = true
           }
         }
         if (redRow) {
           redRow = false; 
           continue;}  else {
             row.push(this.renderSquare(i + j));
           }       
       } 
       if (!winningSquares) {
        row.push(this.renderSquare(i + j));
       }  
     }
     board.push(
       <div className="board-row">{row}</div>
     );
     row = [];
    }
    return (
      <div>
        {board}
      </div>
    );
    //this is the hardcoded version and above is the implementation with loops
  //   return (
  //     <div>        
  //       <div className="board-row">
  //         {this.renderSquare(0)}
  //         {this.renderSquare(1)}
  //         {this.renderSquare(2)}
  //       </div>
  //       <div className="board-row">
  //         {this.renderSquare(3)}
  //         {this.renderSquare(4)}
  //         {this.renderSquare(5)}
  //       </div>
  //       <div className="board-row">
  //         {this.renderSquare(6)}
  //         {this.renderSquare(7)}
  //         {this.renderSquare(8)}
  //       </div>
  //     </div>
  //   );
   }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      coordinates: [{
        row: null,
        column: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      asscending: true,
    };
  }

  handleClick(i) {
    counterClick++;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const coordinates = this.state.coordinates.slice(0, this.state.stepNumber + 1);
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      coordinates: coordinates.concat({
        row: calculateRow(i),
        column: calculateColumn(i),
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    counterJump++;
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  toggle() {
    this.setState({
      asscending: !this.state.asscending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares);
    const toggle = this.state.asscending ? 'Change to asscending order' : 'Change to desscending order';

    const moves = history.map((step, move) => {
      const row = this.state.coordinates[move].row;
      const column = this.state.coordinates[move].column;
      let desc = move ?
      'Go to move #' + move + '{ row-' + row + ' column-' + column + ' }' :
      'Go to game start';
      
      return (
        <BoldButton move={move} 
                    desc={desc} 
                    historyLength={history.length} 
                    onClick={() => this.jumpTo(move)}
                    stepNumber={this.state.stepNumber} />
      );      
    });

    let status;
    if (winner) {
      status = 'Winner is: ' + winner;
    } else {
      status = 'Next player is: ' + (this.state.xIsNext ? "X" : "O");
    }
    if (isDraw(squares)) {
      status = <p className="paragraph-color">It is draw!</p>
    }

    if (!this.state.asscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => {this.handleClick(i)}} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <SortButton value={toggle} onClick={() => this.toggle()} />
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateWinningSquares(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function calculateRow(index) { 
  return (Math.floor(index / 3) + 1);
}

function calculateColumn(index) {
  for (let i = 0; i < 3; i++) {
    if ((index - i) % 3 === 0) {
      return (i + 1);
    } 
  }
}

//this function is for second item
function BoldButton(props) {
  //this if is for second item on we click on the move it will be changed to bold
  if (props.move === props.stepNumber && counterJump > 0) {
    counterJump = 0;
    return (
      <li key={props.move}>
      <button className="bold-button">{props.desc}</button> 
    </li>
      
    );        
  }
  //on we will click the last move will be bold
  if (counterClick > 0 && props.move === props.historyLength - 1) {
    counterClick = 0;
    return (
      <li key={props.move}>
      <button className="bold-button">{props.desc}</button> 
    </li>
    );
  }
  //this will bold the Go to game start on we did not make any move
  if (props.move === 0 && props.historyLength === 1) {
    return (
      <li key={props.move}>
      <button className="bold-button">{props.desc}</button> 
    </li>
    );
  }
  return (
    <li key={props.move}>
      <button onClick={() => props.onClick()}>{props.desc}</button>
    </li>
  );  
}

//this function is for the forth item
function SortButton(props) {
  return (
    <button onClick={props.onClick}>{props.value}</button>
  );
}

function isDraw(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}




export default App;