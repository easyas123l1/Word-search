import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import WordEntry from './Components/Wordentry/WordEntry';
import WordSearch from './Components/WordSearch/WordSearch';
import SolvedPuzzle from './Components/SolvedPuzzle/SolvedPuzzle';
import { HashRouter as Router, Route } from 'react-router-dom';
import BrowsePuzzles from './Components/BrowsePuzzles/BrowsePuzzles';
import AboutMe from './Components/AboutMe/AboutMe';

//this should be the new head of git

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      text: '',
      size: '16',
      badWords: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleRemove = this.handleRemove.bind(this); 
    this.activateDelete = this.activateDelete.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSolve = this.handleSolve.bind(this);
    this.removeSolve = this.removeSolve.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }

  componentDidMount() {
    var myTxt = require('./badwords.txt');
    this.readTextFile(myTxt);
  }

  readTextFile = file => {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
          allText = allText.split("\n");
          this.setState({
            badWords: allText
          });
        }
      }
    };
    rawFile.send(null);
  }

  badWordTest(word) {
    const {badWords} = this.state;
    const foundWord = badWords.find( bw => bw.toUpperCase().trim() === word)
    if (foundWord) {
      return false
    }
    return true
  }

  handleChange(e) {
    this.setState({ text: e.target.value.toUpperCase() });
  }

  handleSubmit(e) {
    e.preventDefault();
    //checks that field is not empty  
    if (!this.state.text.length) {
      alert('Input field can not be empty');
      return;
    }

    //test that input word has valid alphabet letters.
    if (/[^a-zA-Z]/.test(this.state.text)) {
      alert('Input must contain only letters A-Z. (No spaces, numbers, special characters, etc.)');
      return;
    }

    if (this.state.text.length === 1) {
      alert('Words should be longer then 1 character.');
      return;
    }

    let bad = this.badWordTest(this.state.text);
    if (!bad) {
      alert('Please do not use bad words');
      return;
    }

    const newItem = {
      text: this.state.text.toUpperCase(),
      id: Date.now(),
      activate: '',
      solved: '',
      color: ''
    };

    //test that the same word can not be added twice.
    for (let word in this.state.words) {
      if (this.state.words[word].text === newItem.text) {
        console.log('same word error');
        return;
      }
    }

    this.setState(state => ({
      words: state.words.concat(newItem),
      text: ''
    }));
  }

  handleSolve(wordIndex) {
    let newWord = this.state.words;
    newWord[wordIndex].solved = 'solved'
    this.setState( () => ({
      newWord
    }))
  }

  removeSolve() {
    let words = this.state.words;
    for (let word in words) {
      if (words[word].solved === 'solved') {
        words[word].solved = ''
      }
    }
    this.setState( () => ({
      words
    }))
  }

  removeColor() {
    let words = this.state.words;
    for (let word in words) {
      if (words[word].color !== '') {
        words[word].color = ''
      }
    }
    this.setState( () => ({
      words
    }))
  }

  handleRemove(e) {
    e.preventDefault();
    let newWord = this.state.words;
    for (let index = 0; newWord.length > index; index++) {
      if (this.state.words[index].activate === 'active') {
        newWord.splice(index, 1);
        index = 0;
      }
    }
    this.setState( () => ({
      newWord
    }))
  }

  handleSizeChange(e) {
    this.setState({
      size: e.target.value
    });
  }

  handleColorChange(color, word) {
    const words = this.state.words;
    color = color + 'word';
    words[word].color = color;
    this.setState( () => ({
      words: words
    }))
  }

  activateDelete(e) { 
    //targets the LI and splits off the text thats not the word.
    let findWord = e.target.innerText.split(' ');
    findWord = findWord[1];
    let newWords = this.state.words;   
    //finds the word clicked and selects for deletion... or unselect
    for (let word in newWords) {
      if (findWord === newWords[word].text) {
        if (newWords[word].activate === 'active') {
          newWords[word].activate =  '';
        } else {
          newWords[word].activate = 'active';
        }
       }
    }
    this.setState( () => ({
      newWords
    }))
  }

  
  render() {
    return (
      <Router basename='/'>
        <div className="App">
          <Route path="/" exact render={
            () => {
              return (
                <div>
                  <Navigation />
                  <WordEntry 
                    words={this.state.words}
                    text={this.state.text}
                    size={this.state.size}
                    generatePuzzle={this.state.generatePuzzle}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleRemove={this.handleRemove}
                    activateDelete={this.activateDelete}
                    handleSizeChange={this.handleSizeChange}
                    /> 
                </div>
              )
            }
          }/>
          <Route path="/WordSearch" exact render={
            () => {
              return (
                <div>
                  <Navigation />
                  <WordSearch 
                  words={this.state.words}
                  size={this.state.size}
                  handleSolve={this.handleSolve}
                  removeSolve={this.removeSolve}
                  handleColorChange={this.handleColorChange}
                  removeColor={this.removeColor}
                  /> 
                </div>
              )
            }
          }/>
          <Route path="/AboutMe" exact render={
            () => {
              return (
                <div>
                  <Navigation />
                  <AboutMe />
                </div>
              )
            }
          }/>
        </div>
        <Route path="/BrowsePuzzles" exact render={
          () => {
            return (
              <div>
                <Navigation />
                <BrowsePuzzles />
              </div>
              )
            }
          }/>
        <Route path='/SolvedPuzzle' exact render={
          () => {
            return (
              <div>
                <Navigation />
                <SolvedPuzzle />
              </div>
              )
           }
          }/>
      </Router>
    );
  }
}



export default App;