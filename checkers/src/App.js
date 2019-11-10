import React from 'react';
//import logo from './logo.svg';
import './App.css';

var counterJump = 0;
var counterClick = 0; //se foloseste pentru orientare ca sa cunoastem cand sa afisam un bold button

var allDiagonals = [
  [48, 57],
  [32, 41, 50, 59],
  [16, 25, 34, 43, 52, 61],
  [0, 9, 18, 27, 36, 45, 54, 63],
  [2, 11, 20, 29, 38, 47],
  [4, 13, 22, 31],
  [6, 15],
  [0],
  [2, 9, 16],
  [4, 11, 18, 25, 32],
  [6, 13, 20, 27, 34, 41, 48],
  [15, 22, 29, 36, 43, 50, 57],
  [31, 38, 45, 52, 59],
  [47, 54, 61],
  [63]
]; 
var allBlackCells = [0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63];

//reprezinta un buton de culoare alba care va fi rendered pe tabla de checkers
function SquareWhite(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//retprezinta a green button care will be rendered pe tabla de checkers
function SquareGreen(props) {
  return (
    <button className="square-green" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SquareRed(props) {
  return (
    <button className="square-red" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SquareYellow(props) {
  return (
    <button className="square-yellow" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SquareWhiteN(props) {
  return (
    <button className="square-white-n">
      {props.value}
    </button>
  );
}

function SquareWhiteL(props) {
  return (
    <button className="square-white-l">
      {props.value}
    </button>
  );
}

function SquareWhiteFL(props) {
  return (
    <button className="square-white-fl">
      {props.value}
    </button>
  );
}

//aceasta clasa will represent the whole board of checkers
class Board extends React.Component {
  //will render a white square
  renderWhiteSquare(i) {
    return (
      <SquareWhite value={this.props.squares[i]} onClick={() => {this.props.onClick(i)}}/>
    );
  }

  //will render a green square
  renderGreenSquare(i) {
    return (
      <SquareGreen value={this.props.squares[i]} onClick={() => {this.props.onClick(i)}}  />
    );
  }

  //with red will be rednered the cells where we can move
  renderRedSquare(i) {
    return (
      <SquareRed value={this.props.squares[i]} onClick={() => {this.props.onClick(i)}} />
    );
  }

  //with yellow will be rendered the cells that must to move
  renderYellowSquare(i) {
    return (
      <SquareYellow value={this.props.squares[i]} onClick={() => {this.props.onClick(i)}} />
    );
  }

  renderWhiteSquareN(i) {
    return (
      <SquareWhiteN value={i} />
    );
  }

  renderWhiteSquareL(i) {
    return (
      <SquareWhiteL value={i} />
    );
  }

  renderWhiteSquareFL(i) {
    return (
      <SquareWhiteFL value={i} />
    );
  }

  //when React renders the Board class it executes this method
  render() {
    let row = []; //will contains all the cells from one row
    const board = []; //will contains all the rows for the board
    let counterRow = 0;
    let mustMove = this.props.mandatoryMoves.mustMove;
    let mustMoveUpon = this.props.mandatoryMoves.mustMoveUpon;
    
    
      
    //la fiecare iteration se construieste un rand
    for (let i = 0; i < 64; i+=8) {
      row.push(this.renderWhiteSquareN( (i/8) + 1));
      //on each iteration we build a cell
      for (let i1 = 0; i1 < 8; i1++) {           
        //daca avem celule care sunt obligate sa bata le vom afisa de culoare yellow
        if (mustMove.length > 0) {          
          let counterMustMove = 0;//daca acest counter va fi 1 inseamna ca trebuie sa incepem constructia unei noi celule          
          //iteram prin mustMove pentru a vedea daca indexul cell-ului care vrem sa o inseram pe tabla nu este un mustMove
          for (let i2 = 0; i2 < mustMove.length; i2++) {
            if (i + i1 === mustMove[i2]) {//if true inseamna ca cell construita este mustMove
              row.push(this.renderYellowSquare(i + i1)); //punem cate o celula red in rand
              counterMustMove++;//const a = 0;a++;
            }
          }
          if (counterMustMove === 1) {
            continue; //daca deja s-a pus un cell mustMove iesim din for si incepem constructia urmatoarei cell
          }
        }// if if (mustMove.length > 0)

        //daca avem celule pe care trebie sa bata celula care este obligata sa bata 
        if (mustMoveUpon.length > 0) {
          let counterMustMoveUpon = 0;//daca acest counter va fi 1 inseamna ca trebuie sa incepem constructia unei noi celule          
          //iteram prin mustMove pentru a vedea daca indexul cell-ului care vrem sa o inseram pe tabla nu este un mustMove
          for (let i2 = 0; i2 < mustMoveUpon.length; i2++) {
            if (i + i1 === mustMoveUpon[i2]) {//if true inseamna ca cell construita este mustMove
              row.push(this.renderRedSquare(i + i1)); //punem cate o celula red in rand
              counterMustMoveUpon++;//const a = 0;a++;
            }
          }
          if (counterMustMoveUpon === 1) {
            continue; //daca deja s-a pus un cell mustMove iesim din for si incepem constructia urmatoarei cell
          }
        }


        //daca leftDiagonalUp sau rightDiagonalUp exista atunci acele patrate vor fi rosii
        if (i + i1 === this.props.leftDiagonalUp || i + i1 === this.props.rightDiagonalUp) {
          row.push(this.renderRedSquare(i + i1)); //punem cate o celula red in rand
          continue; //daca am pus celula red nu mai executam codul de mai jos ci continuam cu next iteration
        }
        if (counterRow % 2 === 0) { //pe primul rand redButton trebuie sa fie la par iar pe al doilea la impar si tot asa
          if ((i + i1) % 2 === 0) {
            row.push(this.renderGreenSquare(i + i1)); //punem cate o celula green in rand
          } else {
            row.push(this.renderWhiteSquare(i + i1)); //punem cate o celula white in rand
          }
        } else {
          if ((i + i1) % 2 !== 0) {
            row.push(this.renderGreenSquare(i + i1)); //punem cate o celula red in rand
          } else {
            row.push(this.renderWhiteSquare(i + i1)); //punem cate o celula white in rand
          }
        }              
      }//end for (let i1 = 0; i1 < 8; i1++)
      board.push(
        <div className="board-row">{row}</div>
      )//insert a row in the board
      row = [];//clear the row in order to build another row
      counterRow++;  
    } //end for (let i = 0; i < 64; i+=8)

    const letters = [null, "a", "b", "c", "d", "e", "f", "g", "h"];
    for (let i = 0; i < letters.length; i++) {
      if (i === 0) {
        row.push(this.renderWhiteSquareFL(letters[i]));
      }else {
        row.push(this.renderWhiteSquareL(letters[i]));
      }      
    }
   
    
    const boardReversed = board.reverse();

    boardReversed.push(
      <div className="board-row">{row}</div>
    )//insert a row in the board
    

    return (
      <div>
        {boardReversed}
      </div>
    );
  }// end render()

}//end class Board extends React.Component

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: AllCheckers(),
      }],
      moveNumber: 0,               
      showMoves: false,
      possibleMoves: {
        leftDiagonalUp: null,        
        rightDiagonalUp: null,         
        currentPosition: null,      
      },
      mandatoryMoves: [{
        mustMove: [],//cuprinde toate celulele care au de bataie
        mustMoveUpon: [],//cuprinde celulele unde se poate de batut dupa ce s-a facut click pe celula care must move
      }],
      whiteIsNext: true,
      haveMustMove: false, //daca avem de batut sau nu
      cellMovedFrom: [], //cuprinde celula care a batut 
      cellsForErase: [],//cells that must be erased after the beet is finished
      beatHasBeenDone: false, //s-a batut odata
      currentPositionBeet: null,
      moveFrom: null,
      moveTo: null,
      coordinates: [{//va cuprinde locul de unde s-a mutat piesa si locul unde s-a mutat piesa
        from: null,
        to: null,
      }],
    };
    
  }

  handleClick(i) {             
    let currentPosition = i; //reprezinta cell pe care se face click    
    const history = this.state.history.slice(0, this.state.moveNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //facem o copie a array-ului unde se contin damele 
    const beatHasBeenDone = this.state.beatHasBeenDone; 
    const mandatoryMoves = this.state.mandatoryMoves.slice(0, this.state.moveNumber + 1);
    const currentMandatoryMoves = mandatoryMoves[mandatoryMoves.length - 1]; 
    const mustMove = currentMandatoryMoves.mustMove;
    const mustMoveUpon = currentMandatoryMoves.mustMoveUpon;
    const whiteIsNext = this.state.whiteIsNext;
    let oppositeColor = whiteIsNext ? "B" : "W";
    let collorToMove = whiteIsNext ? "W" : "B";   
    const coordinates = this.state.coordinates.slice(0, this.state.moveNumber + 1);   

    
    //daca avem mutare obligatorie dar nu s-a batut niciodata
    if (mustMove.length > 0) {      
      if (!mustMoveUpon.includes(i) && !mustMove.includes(i)) {       
        this.setState({//daca facem click pe un camp care nu este obligat sa bata se erase cell rosu
          mandatoryMoves: mandatoryMoves.slice(0, this.state.moveNumber).concat([{
            mustMove: mustMove,
            mustMoveUpon: [],
          }]), 
        });
        return;
      }//end if (!mustMoveUpon.includes(i) && !mustMove.includes(i))    
      
      //daca cell pe care s-a facut click este mustMove aratam prin red cells unde poate sa bata
      if (mustMove.includes(i)) {        
        let firstDiagonal = null;
        let secondDiagonal = null;
        let counterDiagonal = 0;
        for (let j = 0; j < allDiagonals.length; j++) {//cautam diagonalele unde se include cell mustMove
          if (allDiagonals[j].includes(currentPosition)) {
            if (counterDiagonal === 0) {
              firstDiagonal = allDiagonals[j];
              counterDiagonal++;
            } else {
              secondDiagonal = allDiagonals[j];
            }           
          }
        }//end for (let j = 0; j < allDiagonals.length; j++)
                
        let mustMoveUpon = []; //stocam indexul campurilor unde suntem obligati sa batem  
        for (let j = 0; j < firstDiagonal.length; j++) {//aflam daca pe prima diagonala avem de batut
          if (firstDiagonal[j] === currentPosition) {//verificam daca pe prima diagonal este de batut
            if (squares[firstDiagonal[j+1]] === oppositeColor && squares[firstDiagonal[j+2]] === null && !this.state.cellsForErase.includes(firstDiagonal[j+1])) {//diagonala in sus verificat
              mustMoveUpon.push(firstDiagonal[j+2]);
            }
            if (squares[firstDiagonal[j-1]] === oppositeColor && squares[firstDiagonal[j-2]] === null && !this.state.cellsForErase.includes(firstDiagonal[j-1])) {//diagonala in jos verificat
              mustMoveUpon.push(firstDiagonal[j-2]);
            }
          }//end if (firstDiagonal[j] === currentPosition)          
        }//end for (let j = 0; j < firstDiagonal.length; j++)

        for (let j = 0; j < secondDiagonal.length; j++) {//aflam daca pe a doua diagonala avem de batut
          if (secondDiagonal[j] === currentPosition) {//verificam daca pe a doua diagonal este de batut
            if (squares[secondDiagonal[j+1]] === oppositeColor && squares[secondDiagonal[j+2]] === null && !this.state.cellsForErase.includes(secondDiagonal[j+1])) {//diagonala in sus verificat
              mustMoveUpon.push(secondDiagonal[j+2]);
            }
            if (squares[secondDiagonal[j-1]] === oppositeColor && squares[secondDiagonal[j-2]] === null && !this.state.cellsForErase.includes(secondDiagonal[j-1])) {//diagonala in jos verificat
              mustMoveUpon.push(secondDiagonal[j-2]);
            }
          }//end if (secondDiagonal[j] === currentPosition)          
        }//end for (let j = 0; j < secondDiagonal.length; j++)
        this.setState({
          mandatoryMoves: mandatoryMoves.slice(0, this.state.moveNumber).concat([{
            mustMove: currentMandatoryMoves.mustMove,
            mustMoveUpon: mustMoveUpon,
          }]),          
          cellMovedFrom: [i],
        });        
        return;
      }//end if (mustMove.includes(i))

      let haveNextToBeat = false;
      let indexFrom = this.state.cellMovedFrom[0];//de unde s-a mutat piesa  
      let indexUpon = i;//unde s-a efectuat bataia 
      let cellForErase = null;//cuprinde celula care trebuie golite deoarece piesele de pe ele au fost batute       
      //daca se face click pe cell pe care se putea de batut
      if (mustMoveUpon.includes(i)) {                  
        //iteram prin toate digonalele pentru a gasi diagonala pe unde s-a efectuat bataia si a afla cell care trebuie eliminata
        for (let j = 0; j < allDiagonals.length; j++) {                    
          if (allDiagonals[j].includes(indexFrom) && allDiagonals[j].includes(indexUpon)) {                      
            let diagonal = allDiagonals[j];//diagonala pe care s-a efectuat miscarea
            //iteram prin diagonala pentru a gasi cell that must be erased
            for (let j1 = 0; j1 < diagonal.length; j1++) {
              if (diagonal[j1] === indexFrom && diagonal[j1+2] === indexUpon) {                                
                cellForErase = diagonal[j1+1];                  
                // this.setState({
                //   cellsForErase: this.state.cellsForErase.concat([cellForErase]),
                // });
                this.state.cellsForErase = this.state.cellsForErase.concat([cellForErase]);                
                break;
              }
              if (diagonal[j1] === indexUpon && diagonal[j1+2] === indexFrom) {                               
                cellForErase = diagonal[j1+1];                
                // this.setState({//daca schimbam prin metoda atunci la ultima celula nu reuseste sa faca schimbarea
                //   cellsForErase: this.state.cellsForErase.concat([cellForErase]),
                // });
                this.state.cellsForErase = this.state.cellsForErase.concat([cellForErase]);
                break;
              }
            }//end for (let j1 = 0; j1 < diagonal.length; j1++)           
           
          }//end if (allDiagonals[j].includes(indexFrom) && allDiagonals[j].includes[indexUpon]) 
        }//end for (let j = 0; j < allDiagonals.length; j++)  
        
        //iteram prin toate diagonalele pentru a afla daca piesa are de batut in continuare
        for (let j = 0; j < allDiagonals.length; j++) {
          let diagonal = null;
          if (allDiagonals[j].includes(indexUpon)) {
            diagonal = allDiagonals[j];
            for (let j1 = 0; j1 < diagonal.length; j1++) {//vedem daca pe aceasta diagonala avem de bataie
              if (diagonal[j1] === indexUpon && diagonal[j+1] !== cellForErase && squares[diagonal[j1+1]] === oppositeColor && squares[diagonal[j1+2]] === null) {
                haveNextToBeat = true;
              }
              if (diagonal[j1] === indexUpon && diagonal[j-1] !== cellForErase && squares[diagonal[j1-1]] === oppositeColor && squares[diagonal[j1-2]] === null) {
                haveNextToBeat = true;
              }
            }//end for (let j1 = 0; j1 < diagonal.length; j1++)
          }//end if (allDiagonals[j].includes(indexUpon))
        }//end for (let j = 0; j < allDiagonals.length; j++)
        this.state.moveTo = i;
        
      }//end if (mustMoveUpon.includes(i))

      if (haveNextToBeat) {//daca dupa ce s-a batut mai avem de bataie
        //const a = 3; a++;        
        squares[indexFrom] = null;
        squares[indexUpon] = collorToMove
        this.setState({
          history: this.state.history.concat([{
            squares: squares
          }]),
          cellsForErase: this.state.cellsForErase.concat([cellForErase]),
          mandatoryMoves: mandatoryMoves.slice(0, this.state.moveNumber).concat([{
            mustMove: [indexUpon],
            mustMoveUpon: [],
          }]),          
          moveNumber: history.length,
          coordinate: coordinates.concat([{
            from: calculateMove(this.state.moveFrom),
            to: calculateMove(this.state.moveTo),
          }]),
        });        
      }// end if (haveNextToBeat)

      if (!haveNextToBeat) {//daca dupa ce batem nu mai avem de batut
        //const a = 3; a++;
        let cellsForErase = this.state.cellsForErase;
        for (let j = 0; j < cellsForErase.length; j++) {//stergem toate cells care au fost batute
          squares[cellsForErase[j]] = null;
        }        
        //squares[cellForErase] = null;
        squares[indexFrom] = null;
        squares[indexUpon] = collorToMove;
        this.setState({
          history: this.state.history.concat([{
            squares: squares
          }]),
          cellsForErase: [],
          mandatoryMoves: mandatoryMoves.slice(0, this.state.moveNumber).concat([{
            mustMove: [],
            mustMoveUpon: [],
          }]),          
          whiteIsNext: !this.state.whiteIsNext,
          beatHasBeenDone: true,
          moveNumber: history.length,
          coordinates: coordinates.concat([{
            from: calculateMove(this.state.moveFrom),
            to: calculateMove(this.state.moveTo),
          }]),
        }, this.handleAfterMove);
      }//end if (!haveNextToBeat)


      return;//daca nu punem acest return dupa ce se bate piesa care a batut arata unde mai poate merge. 
    }//end if (this.state.mandatoryMoves.mustMove.length > 0)

    //celula pe care se face click are piese albe sau negre    
    if (squares[i]) {      
      if (squares[i] !== collorToMove) {//daca nu este randul piesei pe care s-a facut click        
        this.erasePossibleMoves();
        return;
      }
      if (squares[i] === collorToMove) {//daca este randul culorii pe care s-a facut click        
        let firstDiagonal = null;
        let secondDiagonal = null;
        let counterDiagonal = 0;
        let firstDiagonalMove = null;
        let secondDiagonalMove = null;
        for (let j = 0; j < allDiagonals.length; j++) {//cautam diagonalele unde poate efecua miscari piesa
          if (allDiagonals[j].includes(currentPosition)) {
            if (counterDiagonal === 0) {              
              firstDiagonal = allDiagonals[j];
              counterDiagonal++;
            } else {
              secondDiagonal = allDiagonals[j];
              break; //daca am gasit si a doua diagonala iesim din loop
            }
          }//end if if (allDiagonals[j].includes(currentPosition))
        }// end for (let j = 0; j < allDiagonals.length; j++)

        //vom folosi coeficientul pentru a afla campurile unde putem merge atat cu albele cat si cu negrele
        let coefficient = null; 
        if (collorToMove === "W") {
          coefficient = 1;
        } else {
          coefficient = -1;
        }

        for (let j = 0; j < firstDiagonal.length; j++) {//verify daca pe prima diagonala putem efectua miscare          
          if (firstDiagonal[j] === currentPosition && squares[firstDiagonal[j+coefficient]] === null) {            
            firstDiagonalMove = firstDiagonal[j+coefficient];            
          }
        }
        for (let j = 0; j < secondDiagonal.length; j++) {
          if (secondDiagonal[j] === currentPosition && squares[secondDiagonal[j+coefficient]] === null) {
            secondDiagonalMove = secondDiagonal[j+coefficient];
          }
        }
        this.showPossibleMoves(firstDiagonalMove, secondDiagonalMove, currentPosition);
        this.state.moveFrom = i;
        //return; //daca am aratat unde se poate de miscat iesim din metoda.
      }// end if (squares[i] === collorToMove)
    }//end if (squares[i])       
     
    //daca se face click pe o celula unde este posibila miscarea dupa ce s-a facut click pe celula unde era o piesa
    if (this.state.showMoves && (i === this.state.possibleMoves.leftDiagonalUp || i === this.state.possibleMoves.rightDiagonalUp)) {       
      const nextMove = i; 
      this.state.moveTo = i;      
      this.showMadeMove(squares, nextMove, coordinates);      
      return;     
    } 
    if (this.state.showMoves && !squares[i]) {//daca se face click pe un camp unde sunt piese daca sunt afisate miscarile posibile      
      this.erasePossibleMoves();
    }    
  }//end method handleClick()

  //after each move we check if we have a must move or not
  handleAfterMove() {      
    const history = this.state.history.slice(0, this.state.moveNumber + 1);
    const whiteIsNext = this.state.whiteIsNext;
    let mustMove = []; //stocam pozitia pieselor care sunt obligate sa bata
    //let mustMoveUpon = []; //stocam indexul campurilor unde suntem obligati sa batem
    let oppositeColor = whiteIsNext ? "B" : "W";
    let collorToMove = whiteIsNext ? "W" : "B";
    //const history = this.state.history.slice(0, this.state.moveNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //facem o copie a array-ului unde se contin damele    

    //iteram prin toate campurile negere pentru a verifica daca culoarea care trebuie sa mearga are de batut
    for (let i = 0; i < allBlackCells.length; i++) {      
      let firstDiagonal = null; //prima diagonal in care poate sa mearga piesa
      let secondDiagonal = null; //a doua diagonala in care poate sa mearga piesa      
      let counterFirstDiagonal = 0;      
      let possibleMustMove = null;//contine indexul celulei care possibleMustMove

      //daca in acest camp se contine piesa de culoarea care trebuie sa efectueze urmatoarea miscare
      if (squares[allBlackCells[i]] === collorToMove) {
        possibleMustMove = allBlackCells[i];
        //iteram prin toate diagonalele de pe tabla pentru a gasi acele doua diagonale in care se afla possibleMustMove
        for (let i1 = 0; i1 < allDiagonals.length; i1++) {
          if (allDiagonals[i1].includes(possibleMustMove)) {//daca diagonala contine campul care possibleMustMove            
            if (counterFirstDiagonal === 0) {              
              firstDiagonal = allDiagonals[i1];
              counterFirstDiagonal = 1;
            }
             else {               
              secondDiagonal = allDiagonals[i1];
              break;//daca gasim a doua diagonala, iesim din loop, deoarece pot fi numai doua diagonale unde o piesa se poate afla
            }
          }//end  if (allDiagonals[i1].includes(possibleMustMove))
        }//end for (let i1 = 0; i1 < allDiagonals.length; i1++)        

        //iteram prin prima diagonala pentru a verifica daca possibleMustMove este obligata sa bata
        for (let i1 = 0; i1 < firstDiagonal.length; i1++) {
          if (firstDiagonal[i1] === possibleMustMove) {//vedem la ce index este celula possibleMustMove          
            if ((squares[firstDiagonal[i1+1]] === oppositeColor && squares[firstDiagonal[i1+2]] === null) || (squares[firstDiagonal[i1-1]] === oppositeColor && squares[firstDiagonal[i1-2]] === null)) {
              mustMove.push(possibleMustMove);//cream un array cu toate piesele care sunt obligate sa bata                
            }
          }          
        }//end for (let i1 = 0; i1 < firstDiagonal.length; i1++)   
        
        //iteram prin a doua diagonala pentru a verifica daca possibleMustMove este obligata sa bata
        for (let i1 = 0; i1 < secondDiagonal.length; i1++) {
          if (secondDiagonal[i1] === possibleMustMove) {//vedem la ce index este celula possibleMustMove          
            if ((squares[secondDiagonal[i1+1]] === oppositeColor && squares[secondDiagonal[i1+2]] === null) || (squares[secondDiagonal[i1-1]] === oppositeColor && squares[secondDiagonal[i1-2]] === null)) {
              if (!mustMove.includes(possibleMustMove)) {
                mustMove.push(possibleMustMove);                
              }              
            }
          }
        }//end for (let i1 = 0; i1 < secondDiagonal.length; i1++)
        
      }//end if (squares[allBlackCells[i]] === collorToMove)
      
    }// end for (let i = 0; i < allBlackCells.length; i++)  
    //dacac exista mustMove apelam aceasta metoda, daca nu, nu facem nimic
    if (mustMove.length > 0) {           
      this.showMandatoryMoves(mustMove); 
    }  
  }//end method handleAfterMove()

  //schimba starea tablei si arata ce miscari sunt posibile
  showPossibleMoves(leftDiagonalUp, rightDiagonalUp, currentPosition) {//arata miscarile posibile daca s-a facut click pe un cell care aveaMiscari
    this.setState({             
      showMoves: true,
      possibleMoves: {
        leftDiagonalUp: leftDiagonalUp,
        rightDiagonalUp: rightDiagonalUp,
        currentPosition: currentPosition,
      }
    });
  }

  //schimba starea tablei dupa ce miscarea a fost efectuata
  showMadeMove(squares, nextMove, coordinates) {
    const history = this.state.history.slice(0, this.state.moveNumber + 1);
    squares[nextMove] = squares[this.state.possibleMoves.currentPosition];
    squares[this.state.possibleMoves.currentPosition] = null;
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      possibleMoves: {
        leftDiagonalUp: null,
        rightDiagonalUp: null,
        currentPosition: null,
      },
      showMoves: false,
      moveNumber: history.length,
      whiteIsNext: (history.length % 2) === 0,
      coordinates: coordinates.concat([{
        from: calculateMove(this.state.moveFrom),
        to: calculateMove(this.state.moveTo),
      }]),
    }, this.handleAfterMove
    );    
    
  }

  //schimba starea tablei si ascunde miscarile care erau posibile
  erasePossibleMoves() {
    this.setState({
      showMoves: false,
      possibleMoves: {
        leftDiagonalUp: null,
        rightDiagonalUp: null,
        currentPosition: null,
      }
    });
  }

  showMandatoryMoves(mustMove) {    
    this.setState({
      mandatoryMoves: this.state.mandatoryMoves.slice(0, this.state.moveNumber).concat([{
        mustMove: mustMove,
        mustMoveUpon: [],
      }]),        
    });        
  }

  jumpTo(move) {    
    this.setState({
      moveNumber: move,
      whiteIsNext: (move % 2) === 0
    });    
  }

  render() {
    const history = this.state.history;
    const currentHistory = this.state.history[this.state.moveNumber];
    const squares = currentHistory.squares;
    const white = <strong>White</strong>;
    const black = <strong>Black</strong>;
    let status;
    if (this.state.whiteIsNext) {
      status = <p className="status-paragraph">Player with {white} pieces must to move:</p>;
    } else {
      status = <p className="status-paragraph">Player with {black} pieces must to move:</p>;
    }

    const moves = history.map((step, move) => {
      const from = this.state.coordinates[move].from; //arata de unde s-a mutat                                                 
      const to = this.state.coordinates[move].to; //arata unde s-a efectuat miscarea
      let desc = move ? //cad move este diferit de 0 atunci se va afisa inscriptia de mai jos
      'Go to move #' + move + '{ ' + from + '-' + to + ' }' :
      'Go to game start'; //cand move, adica indexul mutarilor va fi 0 atunci vom afisa aceasta inscriptie
      
      return (
        <BoldButton move={move} 
                    desc={desc} 
                    historyLength={history.length} 
                    onClick={() => this.jumpTo(move)}
                    moveNumber={this.state.moveNumber} />
      );      
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => {this.handleClick(i)}}
          leftDiagonalUp={this.state.possibleMoves.leftDiagonalUp}
          rightDiagonalUp={this.state.possibleMoves.rightDiagonalUp}
          mandatoryMoves={this.state.mandatoryMoves[this.state.mandatoryMoves.length - 1]} />                                      
        </div>
        <div className="game-info">
          {status} 
          <ol>{moves}</ol>   
        </div> 
      </div>
    );
  }
}

function AllCheckers() {
  const checkersTable = new Array(64).fill(null);
  let counterRow = 0;
  for (let i = 0; i < 64; i+=8) { //interam prin fiecare rand din table si incrimentam cu 8
    for (let j = 0; j < 8; j++) { //iteram prin fiecare celula din rand
      if (counterRow % 2 === 0) {//verificam daca randul este par
        if ((i + j) % 2 === 0) { //verificam daca celula este par
          if (i + j < 24) { //cand cell sunt mai mici de 24 in ele inseram dame albe
            checkersTable[i+j] = "W";
          }
          if (i + j > 39) { //cand cell este mai mare ca 39 in ele inseram dame negre
            checkersTable[i+j] = "B";
          }
        }         
      }

      if (counterRow % 2 !== 0) {//verificam daca randul este impar
        if ((i + j) % 2 !== 0) { //verificam daca celula este impar
          if (i + j < 24) { //cand cell sunt mai mici de 24 in ele inseram dame albe
            checkersTable[i+j] = "W";
          }
          if (i + j > 39) { //cand cell este mai mare ca 39 in ele inseram dame negre
            checkersTable[i+j] = "B";
          }
        }         
      }     
    }
    counterRow++;
  }
  return checkersTable;
}//end function AllCheckers()

//calculeaza coordonatele miscarii
function calculateMove(cell) {
  const letters = [
    [0, 16, 32, 48],
    [9, 25, 41, 57],
    [2, 18, 34, 50],
    [11, 27, 43, 59],
    [4, 20, 36, 52],
    [13, 29, 45, 61],
    [6, 22, 38, 54],
    [15, 31, 47, 63],
  ];
  const numbers = [
    [0, 2, 4, 6],
    [9, 11, 13, 15],
    [16, 18, 20, 22],
    [25, 27, 29, 31],
    [32, 34, 36, 38],
    [41, 43, 45, 47],
    [48, 50, 52, 54],
    [57, 59, 61, 63],
  ];
  const eightLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let letter = null;
  let number = null;  

  //iteram pentru a afla litera miscarii
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].includes(cell)) {
      letter = eightLetters[i];
      break;
    }
  }

  //iteram pentru a afla cifra miscarii
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].includes(cell)) {
      number = i + 1;
      break;
    }
  }

  return (letter+number);

}//end function calculateMove(cell)

//reprezinta butonul din istoria miscarilor
function BoldButton(props) {
  //this if is for second item on we click on the move it will be changed to bold
  if (props.move === props.moveNumber && counterJump > 0) {
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

function experiment() {
  const allDiagonals = [
    [48, 57],
    [32, 41, 50, 59],
    [16, 25, 34, 43, 52, 61],
    [0, 9, 18, 27, 36, 45, 54, 63],
    [2, 11, 20, 29, 38, 47],
    [4, 13, 22, 31],
    [6, 15],
    [0],
    [2, 9, 16],
    [4, 11, 18, 25, 32],
    [6, 13, 20, 27, 34, 41, 48],
    [15, 22, 29, 36, 43, 50, 57],
    [31, 38, 45, 52, 59],
    [47, 54, 61],
    [63]
  ]; 

  for (let j = 0; j < allDiagonals.length; j++) {              
    if (allDiagonals[j].includes(45)) {
      if (allDiagonals[j].includes[45]) {return 15;}
                       
      let diagonal = allDiagonals[j];//diagonala pe care s-a efectuat miscarea
      //iteram prin diagonala pentru a gasi cell that must be erased
      for (let j1 = 0; j1 < diagonal.length; j1++) {
        if (diagonal[j1] === 27 && diagonal[j1+2] === 45) {                
          return 27;
        }
        if (diagonal[j1] === 45 && diagonal[j1+2] === 27) {                
          return 45;
        }
      }//end for (let j1 = 0; j1 < diagonal.length; j1++)
      
    }//end if (allDiagonals[j].includes(indexFrom) && allDiagonals[j].includes[indexUpon]) 
  }//end for (let j = 0; j < allDiagonals.length; j++)
  return 19;


}//end function experiment()

export default App;
