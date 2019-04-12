import React, { Component } from 'react';

import './WordSearch.css';
import uuid from 'uuid';
import {Redirect} from 'react-router-dom';

class WordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      answers: [],
      impossiblePuzzle: false,
      firstClickLocation: ''
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.regeneratePuzzle = this.regeneratePuzzle.bind(this);
    this.wordFind = this.wordFind.bind(this);
  }

  printPuzzle() {
    window.print();
  }

  randomPosition = () => {
    let position1 = '';
    let position2 = '';
    let size = +this.props.size;
    position1 = Math.floor(Math.random() * size);
    position2 = Math.floor(Math.random() * size);

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
    let size = +this.props.size;
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
    if (column + length > size -1) {
      down = false;
    }
    if (row + length > size - 1) {
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
        /* this code will test if position has already been tested  Will most likely be placed in a function and if function comes back false then it random another position
        Will need to add something near the end of the do while loop to add to triedpositions array.  Also will need to know the max ammount of positions that could be in array.  ex if size is 10x10 then 100
        length is max and should then say puzzle is impossible and alert user.
        let triedPositions = [];
        let randomPosition = this.randomPosition();
        for (position in triedPositions) {
          if (triedPositions[position] = randomPosition)

        }*/
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
        if (attempts === 100 && !possiblePlacement) {
          alert('word length is too long, or puzzle size is too small.  Try adding size or using smaller words');
          if (!this.state.impossiblePuzzle) {
            this.setState({impossiblePuzzle: true});
          }
          break;
        }
      }
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
    for (let i = 0; +this.props.size > i; i++) { 
    let line = [];
    for (let i2 = 0; +this.props.size > i2; i2++) {
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

      if (i2 + 1 === +this.props.size) {
        const newLine = {
          text: line,
          id: uuid.v4()
        }
        this.setState(state => ({
          lines: state.lines.concat(newLine),
          answers: answers
        }))
      }
      }
    }
  }

  componentWillMount() {
    this.generatePuzzle();
  }

  wordFind(e) {
    //set variables needed
    let answers = this.state.answers;
    let words = this.props.words;
    let selected = e.target.id;
    let objWords = [];
    let index = -1;
    for (let word in words) {
      let length = words[word].text.length;
      let startIndex = index + 1;
      index += length;
      let endIndex = index;
      const newWord = {
        start: answers[startIndex].position,
        end: answers[endIndex].position,
        length: length,
        word: words[word].text,
        wordIndex: word
      }
      objWords.push(newWord);
    }
    console.log(objWords);
    //first click on puzzle starting point.
    if (this.state.firstClickLocation === '') {
      this.setState(() => ({
        firstClickLocation: selected
      }))
    } else {
      //second click on puzzle should allow us to connect dots
      let firstClick = this.state.firstClickLocation;
      let secondClick = selected;
      console.log(firstClick);
      console.log(secondClick);
      console.log(objWords[0].start)
      console.log(objWords[0].end)
      for (let word in objWords) {
        if (firstClick === secondClick) {
          console.log('is it breaking?');
          break;
        }
        if (firstClick === objWords[word].start || firstClick === objWords[word].end) {
          console.log('do we get here?');
          if (secondClick === objWords[word].start || secondClick === objWords[word].end) {
            this.props.handleSolve(word);
            console.log('working');
            console.log(this.props.words);
          }
        }
      }

      this.setState(() => ({
        firstClickLocation: ''
      }))
    }
  }

  render() {
    if (this.state.impossiblePuzzle) {
      return <Redirect to="/" push/>
    }
    return (
      <div className="wordSearch">
        <div className="Puzzle">
        <h1>TITLE OF PUZZLE</h1>
        <ul onClick={this.wordFind}>
          {this.state.lines.map(line => (
            <li id="wordRow" key={line.id} className="findWordRow">
              {line.text.map(letter => (
                <p id={letter.id} key={letter.id}>
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
            {this.props.words.map((word) => (
              <li id='wordList' key={word.id} className={word.solved}>{word.text}</li>
            ))}
          </ul>
          <div id='buttons'>
            <button id='generatePuzzle'
            onClick={this.regeneratePuzzle}>Generate New Puzzle</button>
            <button id='savePuzzle'>Save Puzzle</button>
            <button id='printPuzzle'
            onClick={this.printPuzzle}>Print Puzzle</button>
          </div>
        </div>     
      </div>
    );
  }
}

export default WordSearch;