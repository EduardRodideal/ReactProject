import React from 'react';
//import logo from './logo.svg';
import './App.css';

var counterJump = 0;
var counterClick = 0; //se foloseste pentru orientare ca sa cunoastem cand sa afisam un bold button
var lastSquares = null;

//un buton obisnuit care poate contine fie X fie O
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//un buton care este de culoare verde si poate contine fie X fie O dar X-ul sau O-ul face parte din troica castigatoare
function SquareWinner(props) {
  return (
    <button className="square-winner">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  //returneaza butonul obisnuit
  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]} onClick={() => {this.props.onClick(i)}} />
    );
  }

  //returneaza butonul de culoare verde care face parte din troica castigatoare
  renderSquareWinner(i) {
    return (
      <SquareWinner value={this.props.squares[i]} />
    );
  }  

  //returneaza tot board-ul
  render() {
    const winningSquares = calculateWinningSquares(this.props.squares);//contine care patratele sun castigatoare
    const board = [];//va contine 3 div-uri in care vor fi cate 3 cell-uri iar div-urile by default se aranjeaza from new line
    let row = []; //va contine 3 squares intr-un rind dintre care unul poate fi de cel cistigator
    let winSquare = false; //daca este true inseamna ca cell inserata a fost una castigatoare, daca false (una obisnuita)
    //facem 3 iteratii, la fiecare iteratie se va construi un rand din board
    for (let i = 0; i < 9; i+=3) {// de atras atentia ca i este incremented cu 3
     //facem 3 iteratii, la fiecare iteratie se va construi o cell din row 
     for (let j = 0; j < 3; j++) {
       if (winningSquares) { //daca exista randul castigator
         //iteram prin patratelele castigatoare si vrificam daca indexul la una din ele coincide cu indexul patratelei pe care vrem sa
         //o construim, daca da, atunci cell construita va fi de cea castigatoare.
         for (let k = 0; k < winningSquares.length; k++) {
           // i + j poate lua o valoare intre 0 inclusiv si 8 inclusiv
           if ((i + j) === winningSquares[k]) { 
             //in randul care se construieste in iteratia curenta, urmatoarea cell va fi una castigatoare                        
             row.push(this.renderSquareWinner(i + j));
             winSquare = true;
             break; //avem doar o cell castigatoare, iar daca am gasit-o iesim din for pentru a nu irosi timpul cu calcule inutile
           }
         }
         if (winSquare) { //daca a existat cell castigatoare doar schimbam winSquare in false
           winSquare = false; 
          }  else {//daca nu a fost un cell castigator, atunci punem in row un cell obisnuit
             row.push(this.renderSquare(i + j));
           }       
       } else { //daca nu exista row castigator in row se va pune o cell obisnuita care contine O sau X dar nu este colorata in verde
         row.push(this.renderSquare(i + j));
       }       
     }

     board.push( //pune un rand in board
       <div className="board-row">{row}</div>
     );
     row = []; //reinitializa row ca fiind un array gol pentru a putea construi urmatorul rand
    }
    //la aceasta etapa avem array board care contin 3 div-uri, in fiecare div fiind 3 cell-uri. Respectiv returnam un div in care
    //se contine 3 div-uri, iar in fiecare div fiind 3 cell.
    return (
      <div>
        {board}
      </div>
    );   
   
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
    if (this.state.xIsNext) {
      this.handleClickX(i);
      
    } 
    // while(this.state.xIsNext) {
    //   const a = 3;
    //   a++;
    // }
    // if(!this.state.xIsNext) {
    //   this.handleClickO(calculateComputerMove(lastSquares));
    // }

    
    


  }
  
  handleClickX(i) {
    counterClick++;
    
    //history este un array care contine la fiecare index un alt array format din 9 elemente a caror valori este fie X fie O fie null
    //array-ul de la fiecare index din history descrie situatia de pe tabla la mutarea care corespunde cu numarul index-ului
    //la fiecare click history va fi recalculat in dependenta de ce este afisat pe tabla care poate varia in dependenta de mutarea 
    //care noi am ales-o sa ne fie afisata. Pe tabla in permanenta noi putem sa afisam situatia incepand cu cum a fost la inceputul jocului
    //si pana la ultima miscare care a fost facuta. Iar de fiecare data cand alegem sa ne fie afisata o anumita situatie pe tabla, atunci
    //in state se schimba stepNumber care duce cont pana la ce mutare se afiseaza situatia pe tabla. Daca dorim sa juca altfel atunci 
    //restul history se va elimina, iar eliminarea se face anume prin copierea istoriei pana la mutarea dupa care a urmat clickul
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //toate obiectele pana la ultima mutare
    const current = history[history.length - 1]; //obiectul de la ultima mutare
    const squares = current.squares.slice(); // situatia de pe tabla de la ultima mutare
    //se trimite situatia de pe tabla, daca exista castigator sau cell-ul are o valoare nu facem nicio actiune 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    //aceasta variabila contine un array care la fiecare index contine un obiect. Acest obiect contine numarul randului si numarul
    //coloanei unde s-a facut miscarea la mutarea a carei numar corespunde cu numarul indexului array-ului.
    const coordinates = this.state.coordinates.slice(0, this.state.stepNumber + 1);
    squares[i] = "X";
    //squares[i] = "X";
    lastSquares = squares;
    
    //squares[calculateComputerMove(squares)] = "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      coordinates: coordinates.concat({
        row: calculateRow(i),
        column: calculateColumn(i),
      }),
      stepNumber: history.length,
      xIsNext: false
    });   
    
    //trimitem la metoda calculateComputerMove squares si acesta ne da indexul la care sa inseram O si noi il trimitem la handleClickO
    //pentru a insera acolo O si a face toate modificarile ce rezulta din asta.
   // this.handleClickO(calculateComputerMove(squares));
   
  } 

  handleClickO(i) {
    counterClick++;
    
    
    //history este un array care contine la fiecare index un alt array format din 9 elemente a caror valori este fie X fie O fie null
    //array-ul de la fiecare index din history descrie situatia de pe tabla la mutarea care corespunde cu numarul index-ului
    //la fiecare click history va fi recalculat in dependenta de ce este afisat pe tabla care poate varia in dependenta de mutarea 
    //care noi am ales-o sa ne fie afisata. Pe tabla in permanenta noi putem sa afisam situatia incepand cu cum a fost la inceputul jocului
    //si pana la ultima miscare care a fost facuta. Iar de fiecare data cand alegem sa ne fie afisata o anumita situatie pe tabla, atunci
    //in state se schimba stepNumber care duce cont pana la ce mutare se afiseaza situatia pe tabla. Daca dorim sa juca altfel atunci 
    //restul history se va elimina, iar eliminarea se face anume prin copierea istoriei pana la mutarea dupa care a urmat clickul
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //toate obiectele pana la ultima mutare
    const current = history[history.length - 1]; //obiectul de la ultima mutare
    const squares = current.squares.slice(); // situatia de pe tabla de la ultima mutare
    //se trimite situatia de pe tabla, daca exista castigator sau cell-ul are o valoare nu facem nicio actiune 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    //aceasta variabila contine un array care la fiecare index contine un obiect. Acest obiect contine numarul randului si numarul
    //coloanei unde s-a facut miscarea la mutarea a carei numar corespunde cu numarul indexului array-ului.
    const coordinates = this.state.coordinates.slice(0, this.state.stepNumber + 1);
    squares[i] = "O";
    //squares[i] = "X";
    
    //squares[calculateComputerMove(squares)] = "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      coordinates: coordinates.concat({
        row: calculateRow(i),
        column: calculateColumn(i),
      }),
      stepNumber: history.length,
      xIsNext: true
    });      
  } 



  //cand facem click pe butoanele care ne arata cum au fost efectuate miscarile se schimba state pentru a afisa board-ul care corespundea
  //cu miscarile facute pana la miscarea indicata
  jumpTo(step) {    
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  //daca asscending este true atunci butoanele istorie sunt afisate de la prima mutare pana la ultima, daca este false atunci invers
  //cand se schimba state se face rerendering si ce s-a modificat in App se afiseaza din nou
  toggle() {
    this.setState({
      asscending: !this.state.asscending
    });
  }

  //aceasta metoda afiseaza totata aplicatia si de fiecare data cand se modifica state prin intermediul metodei setState atunci 
  //aceasta metoda este din nou apelata
  render() {
    
    const history = this.state.history; //extrage array-ul care contine obiectele in care se contine starea tablei dupa fiecare miscare
    const current = history[this.state.stepNumber]; //deoarece metoda render este apelata atat cand se face click pe cell,
                                                    // cat si cand se face click pe istoria mutarilor noi afisam pe board starea istorie
                                                    //care corespunde cu respecticul stepNumber.
    const squares = current.squares; //extragem din obiect array-ul square care contine situatia celulelor de pe tabla.
    const winner = calculateWinner(squares); //aflam daca exista castigator pentru a sti ce sa afisam la status
    const toggle = this.state.asscending ? 'Change to asscending order' : 'Change to desscending order'; //aceasta constanta va stoca 
                                           //informatia care fa fi inscriptionata pe butonul care schimba asscending sau desscending istoria  

    //de fiecare data cand se apeleaza metoda render() se formeaza din nou toata istoria mutarilor care va fi afisata 
    //metoda .map returneaza un array unde la fiecare index din array se va contine rezultatul functiei care are ca parametri obiectul care 
    //este la fiecare index in history si insasi indexul                                       
    const moves = history.map((step, move) => {
      const row = this.state.coordinates[move].row; //in array-ul coordinates la fiecare index este un obiect in care se contine informatia
                                                 //pe ce row si ce column sa facut mutarea la mutarea cu numarul care corespunde cu numarul
                                                 //indexului. deci move va fi indexul 0, 1, 2, si tot asa 
      const column = this.state.coordinates[move].column; //la fel ca si cu row de mai sus
      let desc = move ? //cad move este diferit de 0 atunci se va afisa inscriptia de mai jos
      'Go to move #' + move + '{ row-' + row + ' column-' + column + ' }' :
      'Go to game start'; //cand move, adica indexul mutarilor va fi 0 atunci vom afisa aceasta inscriptie
      
      return (
        <BoldButton move={move} 
                    desc={desc} 
                    historyLength={history.length} 
                    onClick={() => this.jumpTo(move)}
                    stepNumber={this.state.stepNumber} />
      );      
    });

    let status; //indica daca avem un castigator sau cine misca urmatorul daca exista castigator
    if (winner) {
      status = 'Winner is: ' + winner;
    } else {
      status = 'Next player is: ' + (this.state.xIsNext ? "X" : "O");
    }
    if (isDraw(squares)) { //aceasta metoda calculeaza daca sau facut toate miscarile si nu exista castigator indica ca este remiza
      status = <p className="paragraph-color">It is draw!</p>
    }

    //in moves avem un array de li care contine toate butoanele. Daca asscending este false atunci inversam acest array si cand il vom 
    //afisa in ol informatia va fi inversata
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
          <div>
            <ButtonComputerMove onClick={() => this.handleClickO(calculateComputerMove(lastSquares))} />
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

//calculeaza daca exista castigator, daca da intoarce X sau O dupa caz, iar daca nu intoarce null
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

//calculeaza daca exista castigator si return care sunt acele 3 cell castigatoare in caz contrar returneaza null
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

//primeste index-ul array-ului si calculeaza pe ce rand este acesta
function calculateRow(index) { 
  return (Math.floor(index / 3) + 1);
}

//primeste indexul array-ului si returneaza pe ce couloana este acesta
function calculateColumn(index) {
  for (let i = 0; i < 3; i++) {
    if ((index - i) % 3 === 0) {
      return (i + 1);
    } 
  }
}

//aceasta functie returneaza in anumite conditii un bold button, conditii indicate prin if, iar in rest returneaza un button obisnuit
//buttonul obisnuit are parametrul onClick deoarece cand se va apasa pe el trebuie sa se schimbe state-ul, iar butoanele care  
//sunt bold nu au onClick, deoarece cand se face click pe ele nu trebuie sa se afiseze altceva decat este afisat. Ce este afisat 
//este anume ceea ce este indicat pe buttonul bold de aceea la onClick el nu trebuie sa declanseze nicio actiune 
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
}//end function BoldButton(props)

//this function is for the forth item
//acest button onClick toggle ascendnt sau descendent istoria mutarilor
function SortButton(props) {
  return (
    <button onClick={props.onClick}>{props.value}</button>
  );
}

//calculeaza daca este egalitate sau nu
function isDraw(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}

//calculeaza mutarea calculatorului
function calculateComputerMove(squares) {  
  
  let counterMove = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      counterMove++;
    }
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //calculam toate mutarile cu exceptia primei
  if (counterMove > 1) {
    return nextComputerMove(lines, squares, counterMove);
  }
  //calculam prima mutare daca X este in centru
  if (counterMove === 1) {
    return firstComputerMove(squares);    
  } 
}

//calculeaza prima mutare
function firstComputerMove(squares) {
  const possibleMovesX = [0, 2, 4, 6, 8];
  const possibleMovesO = [];
  if (squares[4] === null) {
    return 4;
  }

  //cream array care include toate miscarila posibile pentru O prin excluderea locului unde este X
  for (let i = 0; i < possibleMovesX.length; i++) {
    if (!squares[possibleMovesX[i]]) {
      possibleMovesO.push(possibleMovesX[i]);
    }
  }
  const coefficient = [2.5, 5, 7.5, 10];
  const random = Math.random() * 10;

  //return random a possible move
  for (let i = 0; i < coefficient.length; i++) {
    if (random < coefficient[i]) {
      return possibleMovesO[i];
    }
  }  
}

//calculeaza toate mutarile cu exceptia primei
function nextComputerMove(lines, squares, counterMove) { 

  //aceast bloc de cod se executa daca pe o diagonala exista O intr-un colt#1
  //si in celelalte doua patrate X
  if (counterMove === 3) {

    /////#4
  if (counterMove === 3 && squares[4] === null) {
    return 4;
  }

    ////////
    // const verify = 0;
    // verify++;
    /////////

    //aflam daca exista o diagonala cu O in colt si doi de X in restul patratelor
    let emptyDiagonala;
    let counterDiagonala = 0;
    
    //verificam daca X este in centru patratului, daca nu este in centru nu trebuie sa mai verificam mai departe 
    //tot aici aflam care sete diagonala unde putem insera in colturi O

    if (squares[4] === "X") {
      //facem iteratii prin cele doua diagonale
      for (let i = 0; i < 2; i++) {
        //facem iteratii prin cele trei elemente ale diagonalelor
        for (let j = 0; j < 3; j++) {
          //verificam daca toate elementele diagonalei sunt completate
          if (squares[lines[6+i][j]] !== null) {
            counterDiagonala++;
          }
        }//end inner for
        //verificam daca diagonala este formata din X in centru si in colt si O in celalalt colt
        if (counterDiagonala === 3) {
          //atribuim la emptyDiagonala cealalta diagonala
          if (i === 0) {
            emptyDiagonala = lines[7];
          } else {
            emptyDiagonala = lines[6];
          }
          break;
        } else {
            counterDiagonala = 0;//daca prima diagonala nu este cea care trebuie acest counter va fi 1, deci iar il facem 0
        }

      }//end outer for      
    }//end if (squares[4] === "X")

    //daca exista diagonala cu O in colt si in rest X1
    //daca emptyDiagonala are atribuita o valoare atunci alegem aleatoriu un colt al diagonalei

      if (emptyDiagonala) {
        let randomCorner = Math.random() * 10;
        if (randomCorner < 5) {
          return emptyDiagonala[0];
        } else {
          return emptyDiagonala[2];
        }
      }//end if (emptyDiagonala)
  }// end if (counterMove === 3)

  //verificam daca exista 2 de O si un null pe orice lines#2
  //iteram prin toate lines
  for (let i = 0; i < lines.length; i++) {
    let counterO = 0;
    let nullSquare = 10;
    //iteram prin fiecare array din array lines
    for (let j = 0; j < lines[i].length; j++) {
      if (squares[lines[i][j]] === "O") {
        counterO++;
      }
      if (squares[lines[i][j]] === null) {
        nullSquare = lines[i][j];
      }
    }//end inner for
    
    //verificam daca exista doi de O si o cell libera
    if (counterO === 2 && nullSquare !== 10) {
      return nullSquare;
    }
  }//end outer for


  // //verificam daca X nu poate face 3 X
  // //facem iteratii prin toate lines sa verificam unde sunt doi de X si un null#3
  for (let i = 0; i < lines.length; i++) {
    let counterX = 0;
    let nullSquare = 10;
    //iteram prin fiecare array din array lines
    for (let j = 0; j < lines[i].length; j++) {
      if (squares[lines[i][j]] === "X") {
        counterX++;
      }
      if (squares[lines[i][j]] === null) {
        nullSquare = lines[i][j];
      }
    }//end inner for
    
    //verificam daca exista doi de O si o cell libera
    if (counterX === 2 && nullSquare !== 10) {
      return nullSquare;
    }
  }//end outer for
  

  //verificam daca exista un O si doi de null pe orice linie si punem acolo un O#5
  for (let i = 0; i < lines.length; i++) {
    let counterO = 0;
    let counterNull = 0;
    let nullSquare = 0;
    //iteram prin fiecare array din array lines
    for (let j = 0; j < lines[i].length; j++) {
      if (squares[lines[i][j]] === "O") {
        counterO++;
      }
      if (squares[lines[i][j]] === null) {
        counterNull++;
        nullSquare = lines[i][j];
      }
    }//end inner for
    
    //verificam daca exista doi de O si o cell libera
    if (counterO === 1 && counterNull === 2) {
      return nullSquare;
    }
  }//end outer for

  //punem O in orice cell goala#6
  for (let i = 0; i < lines.length; i++) {    
    //iteram prin fiecare array din array lines
    for (let j = 0; j < lines[i].length; j++) {
      if (squares[lines[i][j]] === null) {
        return lines[i][j];
      }      
    }//end inner for    
    
  }//end outer for


}

function ButtonComputerMove(props) {
  return (
    <button onClick={() => {props.onClick()} }>Computer move</button>
  );
}

//functie folosita pentru debug
function exercise() {
  const squares = ["O", "X", "O", null, "X", null, "X", "O", "X"];
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //punem O in orice cell goala#6
  for (let i = 0; i < lines.length; i++) {    
    //iteram prin fiecare array din array lines
    for (let j = 0; j < lines[i].length; j++) {
      if (squares[lines[i][j]] === null) {
        return lines[i][j];
      }      
    }//end inner for    
    
  }//end outer for

}











































export default App;