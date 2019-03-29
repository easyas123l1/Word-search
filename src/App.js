import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import WordEntry from './Components/WordEntry/WordEntry';
import WordSearch from './Components/WordSearch/WordSearch';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      text: '' 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleRemove = this.handleRemove.bind(this); 
    this.activateDelete = this.activateDelete.bind(this);
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

    const newItem = {
      text: this.state.text.toUpperCase(),
      id: Date.now(),
      activate: ''
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

  handleRemove(e) {
    e.preventDefault();
    let newWord = this.state.words;
    for (let index in this.state.words) {
      if (this.state.words[index].activate === 'active') {
        newWord.splice(index, 1);
      }
    }
    this.setState( () => ({
      newWord
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
      <Router>
        <div className="App">
          <Route path="/" exact render={
            () => {
              return (
                <div>
                  <Navigation />
                  <WordEntry 
                    words={this.state.words}
                    text={this.state.text}
                    generatePuzzle={this.state.generatePuzzle}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleRemove={this.handleRemove}
                    activateDelete={this.activateDelete}
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
                </div>
              )
            }
          }/>
      </Router>
    );
  }
}

export default App;