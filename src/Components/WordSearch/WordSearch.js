import React, { Component } from 'react';

import './WordSearch.css';
import uuid from 'uuid';

class WordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      answers: []
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.regeneratePuzzle = this.regeneratePuzzle.bind(this);
  }
  randomPosition = () => {
    let position1 = '';
    let position2 = '';

    position1 = Math.floor(Math.random() * this.props.size);
    position2 = Math.floor(Math.random() * this.props.size);

    let position = position1 + ', ' + position2;
    return position;
  }

  randomLetter = () => {
    let letter = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    letter = possible.charAt(Math.floor(Math.random() * possible.length));

    return letter; 
  }
  
  testDirections = (word, position) => {
    let length = word.length;
    length -= 1;
    let newPosition = position.replace(',','');
    newPosition = newPosition.split(' ');
    let row = newPosition[0];
    let column = newPosition[1];
    //make row and column #'s
    row = +row;
    column = +column;
    //directions to test set default to true
    let up = true;
    let left = true;
    let down = true;
    let right = true;
    if (column - length < 0) {
      up = false;
    }
    if (row - length < 0) {
      left = false;
    }
    if (column + length > this.props.size -1) {
      down = false;
    }
    if (row + length > this.props.size - 1) {
      right = false;
    }
    return [up, left, down, right, row, column]
  }

  testDiagonal = (direction1, direction2) => {
    if (direction1 && direction2) {
      return true;
    } else {
      return false;
    }
  }

  logPosition = (row, column, character) => {
    let position = row + ', ' + column;
    const newCharacter = {
      position: position,
      character: character
    }
    return newCharacter
  }

  goUp = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
    }
    return coordinates;
  }

  goUpRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row++;
    }
    return coordinates;
  }

  goRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row++
    }
    return coordinates;
  }

  goDownRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
      row++
    }
    return coordinates;
  }

  goDown = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
    }
    return coordinates;
  }

  goDownLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
      row--
    }
    return coordinates;
  }

  goLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row--;
    }
    return coordinates;
  }

  goUpLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row--;
    }
    return coordinates;
  }

  placeWords() {
    let words = [];
    for (let word in this.props.words) {
      words.push(this.props.words[word].text);
    }
    let coordinates = [];
    for (let word in words) {
      let attempts = 0;
      let possiblePlacement = true;
      do {
        attempts++;
        let directions = this.testDirections(words[word], this.randomPosition());
        let directUp = directions[0];
        let directLeft = directions[1];
        let directDown = directions[2];
        let directRight = directions[3];
        let row = directions[4];
        let column = directions[5];
        //if it cant go any direction will need to random new position.
        if (!directUp && !directLeft && !directDown && !directRight) {
          possiblePlacement = false;
        }
        //check diagonal directions
        let directUpLeft = this.testDiagonal(directUp, directLeft);
        let directUpRight = this.testDiagonal(directUp, directRight);
        let directDownRight = this.testDiagonal(directDown, directRight);
        let directDownLeft = this.testDiagonal(directDown, directLeft);

        //will need to turn directions into objects then put them into the array.  The objects should have the directions as text and true or false if they can be placed.

        const objUp = {
          direction: 'Up',
          possible: directUp
        }
        const objUpRight = {
          direction: 'UpRight',
          possible: directUpRight
        }
        const objRight = {
          direction: 'Right',
          possible: directRight
        }
        const objDownRight = {
          direction: 'DownRight',
          possible: directDownRight
        }
        const objDown = {
          direction: 'Down',
          possible: directDown
        }
        const objDownLeft = {
          direction: 'DownLeft',
          possible: directDownLeft
        }
        const objLeft = {
          direction: 'Left',
          possible: directLeft
        }
        const objUpLeft = {
          direction: 'UpLeft',
          possible: directUpLeft
        }

        let possibleDirections = [objUp, objUpRight, objRight, objDownRight, objDown, objDownLeft, objLeft, objUpLeft];
        let newPossibleDirections = [];
        for (let possibleDirection in possibleDirections) {
          if (possibleDirections[possibleDirection].possible) {
            newPossibleDirections.push(possibleDirections[possibleDirection]);
          }
        }
        let trythis = false
        while (newPossibleDirections.length > 0 && trythis === false) {
          let randomDirection = Math.floor(Math.random() * (newPossibleDirections.length));
          let tryDirection = newPossibleDirections[randomDirection];
          let wordPossibleCoordinates = [];
          let wordPossible = true;
          if (tryDirection.direction === 'Up') {
            wordPossibleCoordinates = this.goUp(words[word], row, column)
          } else if (tryDirection.direction === 'UpRight') {
            wordPossibleCoordinates = this.goUpRight(words[word], row, column)
          } else if (tryDirection.direction === 'Right') {
            wordPossibleCoordinates = this.goRight(words[word], row, column)
          } else if (tryDirection.direction === 'DownRight') {
            wordPossibleCoordinates = this.goDownRight(words[word], row, column)
          } else if (tryDirection.direction === 'Down') {
            wordPossibleCoordinates = this.goDown(words[word], row, column)
          } else if (tryDirection.direction === 'DownLeft') {
            wordPossibleCoordinates = this.goDownLeft(words[word], row, column)
          } else if (tryDirection.direction === 'Left') {
            wordPossibleCoordinates = this.goLeft(words[word], row, column)
          } else {
            wordPossibleCoordinates = this.goUpLeft(words[word], row, column)
          }
          if (word === '0') {
            coordinates = wordPossibleCoordinates;
            trythis = true
          } else {
            for (let coordinate in coordinates) {
              if (!wordPossible) {
                break;
              }
              for (let possibleCoordinate in wordPossibleCoordinates) {
                if (coordinates[coordinate].position === wordPossibleCoordinates[possibleCoordinate].position && coordinates[coordinate].character !== wordPossibleCoordinates[possibleCoordinate].character) {
                  newPossibleDirections.slice(randomDirection, 1);
                  wordPossible = false;
                  break;
                }
              }
            }
            if (wordPossible) {
              coordinates = coordinates.concat(wordPossibleCoordinates);
              break;
            }
          }

          if (newPossibleDirections.length === 0) {
            possiblePlacement = false;
          }
        }
      }//if attempts hits max spit out error send them back to home page and have them reduce words or increase puzzle size.
      while (attempts < 100 && !possiblePlacement);
    }
    return coordinates
  }

  regeneratePuzzle() {
    this.setState(() => ({
      lines: [],
      answers: []
    }))
    this.generatePuzzle();
  }

  generatePuzzle() {
    let answers = this.placeWords();
    for (let i = 0; this.props.size > i; i++) { 
    let line = [];
    for (let i2 = 0; this.props.size > i2; i2++) {
      let letterid = '';
      let letter = '';
      letterid = i + ', ' + i2;
      for (let answer in answers) {
        if (answers[answer].position === letterid) {
          letter = answers[answer].character
        }
      }
      if (letter === '') {
        letter = this.randomLetter();
      }
      const newLetter = {
        text: letter, 
        id: letterid
      } 
      line.push(newLetter);

      if (i2 + 1 === this.props.size) {
        const newLine = {
          text: line,
          id: uuid.v4()
        }
        this.setState(state => ({
          lines: state.lines.concat(newLine),
          answers: state.answers.concat(answers)
        }))
      }
      }
    }
  }

  componentWillMount() {
    this.generatePuzzle();
  }

  render() {
    return (
      <div className="wordSearch">
        <div className="Puzzle">
        <h1>TITLE OF PUZZLE</h1>
        <ul>
          {this.state.lines.map(line => (
            <li id="wordRow" key={line.id} className="findWordRow">
              {line.text.map(letter => (
                <p id="letter" key={letter.id}>
                  {letter.text}
                </p>
              ))}
            </li>
          ))}
        </ul>   
        </div>
        <div className="wordsToFind">
          <ul>
            <h1>WORDS TO FIND:</h1>
            {this.props.words.map((word, i) => (
              <li id='wordList' key={word.id}>{word.text}</li>
            ))}
          </ul>
          <button id='generatePuzzle'
          onClick={this.regeneratePuzzle}>Generate New Puzzle</button>
          <button id='savePuzzle'>Save Puzzle</button>
        </div>     
      </div>
    );
  }
}

export default WordSearch;