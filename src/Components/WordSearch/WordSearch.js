import React, { Component } from "react";

import "./WordSearch.css";
import uuid from "uuid";
import { Redirect } from "react-router-dom";
import classnames from "classnames";

class WordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      linestwo: [],
      answers: [],
      impossiblePuzzle: false,
      firstClickLocation: "",
      puzzleSolved: false
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.regeneratePuzzle = this.regeneratePuzzle.bind(this);
    // this.wordFind = this.wordFind.bind(this);
    // this.mouseHover = this.mouseHover.bind(this);
    // this.mouseLeave = this.mouseLeave.bind(this);
  }

  randomPosition = () => {
    //randoms a position on the board to start word placements.
    let position1 = "";
    let position2 = "";
    let size = +this.props.size;
    position1 = Math.floor(Math.random() * size);
    position2 = Math.floor(Math.random() * size);
    let position = position1 + ", " + position2;
    return position;
  };

  randomLetter = () => {
    //randoms letters for coordinates that don't have set letters.
    let letter = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    letter = possible.charAt(Math.floor(Math.random() * possible.length));

    return letter;
  };

  testDirections = (word, position) => {
    //function tests the four common directions up right down left.
    let length = word.length - 1;
    let size = +this.props.size;
    length -= 1;
    let newPosition = position.replace(",", "");
    newPosition = newPosition.split(" ");
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
    if (column + length > size - 1) {
      down = false;
    }
    if (row + length > size - 1) {
      right = false;
    }
    return [up, left, down, right, row, column];
  };

  testDiagonal = (direction1, direction2) => {
    //will testdiagonal directions
    if (direction1 && direction2) {
      return true;
    } else {
      return false;
    }
  };

  logPosition = (row, column, character) => {
    //sets the coordinates in a set text format of 'number, number' and character in a obj.
    let position = row + ", " + column;
    const newCharacter = {
      position: position,
      character: character
    };
    return newCharacter;
  };

  goUp = (word, row, column) => {
    //this sets the coordinates up one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
    }
    return coordinates;
  };

  goUpRight = (word, row, column) => {
    //this sets the coordinates up and right one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row++;
    }
    return coordinates;
  };

  goRight = (word, row, column) => {
    //this sets the coordinates right one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row++;
    }
    return coordinates;
  };

  goDownRight = (word, row, column) => {
    //this sets the coordinates down and right one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
      row++;
    }
    return coordinates;
  };

  goDown = (word, row, column) => {
    //this sets the coordinates down one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
    }
    return coordinates;
  };

  goDownLeft = (word, row, column) => {
    //this sets the coordinates down and left one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
      row--;
    }
    return coordinates;
  };

  goLeft = (word, row, column) => {
    //this sets the coordinates left one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row--;
    }
    return coordinates;
  };

  goUpLeft = (word, row, column) => {
    //this sets the coordinates up and left one position
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = this.logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row--;
    }
    return coordinates;
  };

  randomChecker(tried) {
    //this will test if a random coordinates = already tested coordinates.
    let newPosition = false;
    while (!newPosition) {
      let randomPosition = this.randomPosition();
      newPosition = true;
      for (let index in tried) {
        if (randomPosition === tried[index]) {
          newPosition = false;
        }
      }
      if (newPosition) {
        return randomPosition;
      }
    }
  }

  placeWords() {
    //words that need to be set in puzzle
    let words0 = this.props.words;
    let words1 = this.props.words1;
    let words2 = this.props.words2;
    let words = [...words0, ...words1, ...words2];
    console.log(words);
    //coordinates of letters of the words that need to be set in puzzle
    let coordinates = [];
    //loop thru each word and place them within puzzle
    for (let word of words) {
      console.log("inside for loop", word);
      console.log(word.length);
      let attempts = 0;
      let possiblePlacement = true;
      let triedPositions = [];
      //the loop that places characters in possible coordinates
      do {
        // console.log('inside do')
        attempts++;
        let maxTries = 1000;
        if (triedPositions.length === maxTries) {
          console.log("max positions tried");
          possiblePlacement = false;
        }
        //retruns a random position that hasnt be tried already.
        let randomPosition = this.randomChecker(triedPositions);
        //test which directions up right down left that are possible
        let directions = this.testDirections(word, randomPosition);
        let directUp = directions[0];
        let directLeft = directions[1];
        let directDown = directions[2];
        let directRight = directions[3];
        let row = directions[4];
        let column = directions[5];
        //if it cant go any direction will need to random new position.
        if (!directUp && !directLeft && !directDown && !directRight) {
          possiblePlacement = false;
        } else {
          //check diagonal directions returns boolean
          let directUpLeft = this.testDiagonal(directUp, directLeft);
          let directUpRight = this.testDiagonal(directUp, directRight);
          let directDownRight = this.testDiagonal(directDown, directRight);
          let directDownLeft = this.testDiagonal(directDown, directLeft);

          //will need to turn directions into objects then put them into the array.  The objects should have the directions as text and true or false if they can be placed.
          const objUp = {
            direction: "Up",
            possible: directUp
          };
          const objUpRight = {
            direction: "UpRight",
            possible: directUpRight
          };
          const objRight = {
            direction: "Right",
            possible: directRight
          };
          const objDownRight = {
            direction: "DownRight",
            possible: directDownRight
          };
          const objDown = {
            direction: "Down",
            possible: directDown
          };
          const objDownLeft = {
            direction: "DownLeft",
            possible: directDownLeft
          };
          const objLeft = {
            direction: "Left",
            possible: directLeft
          };
          const objUpLeft = {
            direction: "UpLeft",
            possible: directUpLeft
          };
          //all directions in an array
          let possibleDirections = [
            objUp,
            objUpRight,
            objRight,
            objDownRight,
            objDown,
            objDownLeft,
            objLeft,
            objUpLeft
          ];
          let newPossibleDirections = [];
          //if obj above is true then it will push that option into this array.
          for (let possibleDirection in possibleDirections) {
            if (possibleDirections[possibleDirection].possible) {
              newPossibleDirections.push(possibleDirections[possibleDirection]);
            }
          }

          // WHen is this code run?  everytime puzzle is generated.
          // Can you exaplain about the app? On call? Get me started..
          //sure should
          let trythis = false;
          //this loop will try to place words in different dirrections to see if characters can be placed in position.
          while (newPossibleDirections.length > 0 && !trythis) {
            //randoms a direction
            let randomDirection = Math.floor(
              Math.random() * newPossibleDirections.length
            );
            let tryDirection = newPossibleDirections[randomDirection];
            let wordPossibleCoordinates = [];
            let wordPossible = true;
            //test the direction
            if (tryDirection.direction === "Up") {
              wordPossibleCoordinates = this.goUp(word, row, column);
            } else if (tryDirection.direction === "UpRight") {
              wordPossibleCoordinates = this.goUpRight(word, row, column);
            } else if (tryDirection.direction === "Right") {
              wordPossibleCoordinates = this.goRight(word, row, column);
            } else if (tryDirection.direction === "DownRight") {
              wordPossibleCoordinates = this.goDownRight(word, row, column);
            } else if (tryDirection.direction === "Down") {
              wordPossibleCoordinates = this.goDown(word, row, column);
            } else if (tryDirection.direction === "DownLeft") {
              wordPossibleCoordinates = this.goDownLeft(word, row, column);
            } else if (tryDirection.direction === "Left") {
              wordPossibleCoordinates = this.goLeft(word, row, column);
            } else {
              wordPossibleCoordinates = this.goUpLeft(word, row, column);
            }
            //if this is the first word it must be able to be placed as no coordinates are used.
            if (word === "0") {
              coordinates = wordPossibleCoordinates;
              trythis = true;
            } else {
              //loop thru current coordinates.
              for (let coordinate in coordinates) {
                if (!wordPossible) {
                  break;
                }
                //if any already set coordinates are = to coordinates for word and are not the same character placement will not be possible and will have to random a new direction.
                for (let possibleCoordinate in wordPossibleCoordinates) {
                  if (
                    coordinates[coordinate].position ===
                      wordPossibleCoordinates[possibleCoordinate].position &&
                    coordinates[coordinate].character !==
                      wordPossibleCoordinates[possibleCoordinate].character
                  ) {
                    if (newPossibleDirections.length === 1) {
                      newPossibleDirections = [];
                      wordPossible = false;
                    } else {
                      newPossibleDirections = newPossibleDirections.slice(
                        randomDirection,
                        1
                      );
                      wordPossible = false;
                      break;
                    }
                  }
                }
              }
              //if after going thru all coordinates and none are conflicting then add the coordinates to the array.
              if (wordPossible) {
                coordinates = coordinates.concat(wordPossibleCoordinates);
                trythis = true;
                possiblePlacement = true;
                break;
              }
            }
            //if there are no longer new directions to go then the coordinates are impossible and will need to random new coordinates to test.
            if (newPossibleDirections.length === 0) {
              possiblePlacement = false;
            }
          }
        }
        //if too many attempts the web app will take too long and will be a slow web app.  This will make sure after 80 attempts we let user know to make adjustments.
        if (attempts === 1000 && !possiblePlacement) {
          console.log("max attempts back out of");
        }
        //adds the coordinates tried to the list of already tried so coordinates aren't tested more then once for each word.
        if (!possiblePlacement) {
          triedPositions.push(randomPosition);
        }
      } while (attempts < 1000 && !possiblePlacement);
    }
    return coordinates;
  }

  regeneratePuzzle() {
    //will generate a new puzzle first set the puzzle to blank.
    this.props.removeSolve();
    this.props.removeColor();
    this.setState(() => ({
      lines: [],
      answers: []
    }));

    //then run the primary function
    this.generatePuzzle();
  }

  generatePuzzle() {
    //runs the code that places the words and returns the coordinates of coordinate/character in an object ex: newChar {position: '1, 3', character: 'A'}
    let answers = this.placeWords();
    console.log(answers, "the answers");
    //loop thru rows
    for (let i = 0; +this.props.size > i; i++) {
      let line = [];
      //loop thru columns
      for (let i2 = 0; +this.props.size > i2; i2++) {
        let letterid = "";
        let letter = "";
        //get coordinates of both arrays ^^
        letterid = i + ", " + i2;
        //loop thru coordinates in words if the coordinate on is = to one then we use the letter from answers
        for (let answer in answers) {
          if (answers[answer].position === letterid) {
            letter = answers[answer].character;
          }
        }
        //if the letter was not placed then we will need to random a letter.
        if (letter === "") {
          letter = this.randomLetter();
        }
        //turn it into an obj to be placed into array
        const newLetter = {
          text: letter,
          id: letterid
        };
        line.push(newLetter);
        //if last one in the column then take line of objs and add it to arrays then update this.state
        if (i2 + 1 === +this.props.size) {
          console.log(line);
          const newLine = {
            text: line,
            id: uuid.v4()
          };
          if (this.state.lines.length < 250) {
            this.setState(state => ({
              lines: state.lines.concat(newLine)
            }));
          } else {
            this.setState(state => ({
              linestwo: state.linestwo.concat(newLine)
            }));
          }
        }
      }
    }
  }

  componentWillMount() {
    //when component gets called it should fire the placement of puzzle function
    console.log(this.props);
    // this.props.removeSolve();
    // this.props.removeColor();
    this.generatePuzzle();
  }

  // wordFind(e) {
  //   //set variables needed
  //   let answers = this.state.answers;
  //   let words = this.props.words;
  //   let selected = e.target.id;
  //   let objWords = [];
  //   let index = -1;
  //   //loop thru words
  //   for (let word in words) {
  //     let length = words[word].text.length;
  //     let startIndex = index + 1;
  //     index += length;
  //     let endIndex = index;
  //     let arrayWord = [];
  //     arrayWord = answers.slice(startIndex, endIndex + 1);
  //     //make a obj with each words starting index, end index, length of word, the words text, and index.
  //     const newWord = {
  //       start: answers[startIndex].position,
  //       end: answers[endIndex].position,
  //       length: length,
  //       word: arrayWord,
  //       wordIndex: word
  //     }
  //     //place the object inside an array.
  //     objWords.push(newWord);
  //   }
  //   //first click on puzzle starting point.
  //   if (this.state.firstClickLocation === '') {
  //     this.setState(() => ({
  //       firstClickLocation: selected
  //     }))
  //     let lines = this.state.lines;
  //     let size = this.props.size - 1;
  //     for (let line in lines) {
  //       for (let i=0; i<=size; i++) {
  //         if (lines[line].text[i].id === selected) {
  //           lines[line].text[i].first = 'first'
  //         }
  //       }
  //     }
  //   } else {
  //     //second click on puzzle should allow us to connect dots
  //     //get the firstClicks coordinates
  //     let firstClick = this.state.firstClickLocation;
  //     //get second clicks coordinates
  //     let secondClick = selected;
  //     for (let word in objWords) {
  //       //if both first and second click are the same location then break out of loop.  NO CHEATING!!
  //       if (firstClick === secondClick) {
  //         break;
  //       }
  //       //if first click is the beggining or the end, and second click is the beggining or the end then that word is solved.
  //       if (firstClick === objWords[word].start || firstClick === objWords[word].end) {
  //         if (secondClick === objWords[word].start || secondClick === objWords[word].end) {
  //           //solve word cross it off of list.
  //           this.props.handleSolve(word);
  //           let lines = this.state.lines;
  //           let size = this.props.size - 1;
  //           //loop thru the word to get positions, loop thru lines to find the positions.  When both match add class to circle letter.
  //           let randomColor = Math.floor(Math.random() * 9);
  //           let colors = ['cyan', 'red', 'green', 'orange', 'pink', 'yellow', 'purple', 'brown', 'silver']
  //           for (let wordLength=0; wordLength<objWords[word].length; wordLength++) {
  //             for (let line in lines) {
  //               for (let i=0; i<=size; i++) {
  //                 if (lines[line].text[i].id === objWords[word].word[wordLength].position) {
  //                   //this will circle the word.
  //                   lines[line].text[i].circle = 'circle';
  //                   //set random color for circle and word found
  //                   lines[line].text[i].color = colors[randomColor];
  //                   this.props.handleColorChange(colors[randomColor], word)
  //                 }
  //               }
  //             }
  //           }
  //           //test if all words are solved then puzzle is solved.  VICTORY!!!
  //           let check = this.props.words;
  //           let checkComplete = true
  //           for (let index in check) {
  //             if (check[index].solved === '') {
  //               checkComplete = false
  //             }
  //           }
  //           if (checkComplete) {
  //             this.setState(() => ({puzzleSolved: true}));
  //           }
  //         }
  //       }
  //     }
  //     let lines = this.state.lines;
  //     let size = this.props.size - 1;
  //     for (let line in lines) {
  //       for (let i=0; i<=size; i++) {
  //         if (lines[line].text[i].id === firstClick) {
  //           lines[line].text[i].first = '';
  //         }
  //       }
  //     }
  //     this.setState(() => ({
  //       firstClickLocation: '',
  //       lines: lines
  //     }))
  //   }
  // }

  // checkTwoConnect(first, second) {
  //   //seperate rows and columns
  //   let firstPosition = first.replace(',','');
  //   let secondPosition = second.replace(',','');
  //   firstPosition = firstPosition.split(' ');
  //   secondPosition = secondPosition.split(' ');
  //   let firstRow = firstPosition[0];
  //   let firstColumn = firstPosition[1];
  //   let secondRow = secondPosition[0];
  //   let secondColumn = secondPosition[1];
  //   //compare rows then compare columns
  //   let rowDifference = secondRow - firstRow;
  //   let columnDifference = secondColumn - firstColumn;
  //   //build a return array
  //   let returnArray = [rowDifference, columnDifference, true];
  //   //test for connection possible
  //   if (rowDifference === 0 || columnDifference === 0) {
  //     return returnArray;
  //   } else if (rowDifference === columnDifference || rowDifference * -1 === columnDifference) {
  //     return returnArray;
  //   } else {
  //     returnArray[2] = false;
  //     return returnArray;
  //   }
  // }

  // mouseHover(e) {
  //   //if position hovered is the same as start or no click then nothing happens.
  //   let startLocation = this.state.firstClickLocation
  //   let lines = this.state.lines;
  //   let size = this.props.size - 1;
  //   if (startLocation === '' || startLocation === e.target.id) {
  //     return;
  //   }
  //   //return the difference of row and column and if possible
  //   let returnArray = this.checkTwoConnect(startLocation, e.target.id)
  //   let rowDifference = returnArray[0];
  //   let columnDifference = returnArray[1];
  //   let possible = returnArray[2];
  //   //split rows and columns
  //   let startPosition = startLocation.replace(',','');
  //   startPosition = startPosition.split(' ');
  //   let startRow = startPosition[0];
  //   let startColumn = startPosition[1];
  //   //start the array of positions
  //   let locations = [startRow + ', ' + startColumn];
  //   //if possible then loop thru all coordinates and add to an array to be styled
  //   if (possible) {
  //     while (rowDifference !== 0 || columnDifference !== 0) {
  //       if (rowDifference > 0) {
  //         rowDifference--
  //         startRow++
  //       } else if (rowDifference < 0) {
  //         rowDifference++
  //         startRow--
  //       }
  //       if (columnDifference > 0) {
  //         columnDifference--
  //         startColumn++
  //       } else if (columnDifference < 0) {
  //         columnDifference++
  //         startColumn--
  //       }
  //       let position = startRow + ', ' + startColumn;
  //       locations.push(position);
  //     }
  //   } else {
  //     return;
  //   }
  //   //add hover to class for styling
  //   for (let index in locations) {
  //     for (let line in lines) {
  //       for (let i=0; i<= size; i++) {
  //         if (lines[line].text[i].id === locations[index]) {
  //           lines[line].text[i].hover = 'hover';
  //         }
  //       }
  //     }
  //   }
  //   this.setState(() => ({
  //     lines: lines
  //   }))
  // }

  // mouseLeave() {
  //   let lines = this.state.lines;
  //   let size = this.props.size - 1;
  //   for (let line in lines) {
  //     for (let i=0; i<= size; i++) {
  //       if (lines[line].text[i].hover === 'hover') {
  //         lines[line].text[i].hover = '';
  //       }
  //     }
  //   }
  //   this.setState(() => ({
  //     lines: lines
  //   }))
  // }

  render() {
    //when puzzle is impossible will redirect back to home page.
    if (this.state.impossiblePuzzle) {
      return <Redirect to="/" push />;
    }
    if (this.state.puzzleSolved) {
      return <Redirect to="/SolvedPuzzle" push />;
    }
    return (
      <div className="wordSearch">
        <div className="Puzzle">
          <h1>TITLE OF PUZZLE</h1>
          <ul>
            {this.state.lines.map(line => (
              <li id="wordRow" key={line.id} className="findWordRow">
                {line.text.map(letter => (
                  <p
                    onMouseEnter={this.mouseHover}
                    onMouseLeave={this.mouseLeave}
                    id={letter.id}
                    key={letter.id}
                  >
                    {letter.text}
                  </p>
                ))}
              </li>
            ))}
            {this.state.linestwo.map(line => (
              <li id="wordRow" key={line.id} className="findWordRow">
                {line.text.map(letter => (
                  <p
                    onMouseEnter={this.mouseHover}
                    onMouseLeave={this.mouseLeave}
                    id={letter.id}
                    key={letter.id}
                  >
                    {letter.text}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default WordSearch;
