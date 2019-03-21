import React, { Component } from 'react';

import './WordEntry.css';

class WordEntry extends Component {
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
    //remove word button needs functionality still.
    //Try implementing something like this next.  https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
    let newWords = this.state.words;
    let newerWords = [];   
    for (let word in newWords) {
      if (newWords[word].activate === '') {
        console.log('working');
        console.log(newWords[word]);
        newerWords = newWords[word];
        console.log('after ' + newerWords);
      }
    }
    console.log(newerWords);
    this.setState( () => ({
      newerWords
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
      <div className='wordInput'>
        <p>Enter a word:</p>
        <form
          onSubmit = {this.hanldeSubmit}
          >
          <input type="text"
          id='new-word'
          onChange={this.handleChange}
          value={this.state.text}
          />
          <button 
          id="btnAddWord"
          onClick={this.handleSubmit}>
            Add word #{this.state.words.length + 1}
          </button>
          <button
          id="btnRemoveWord"
          onClick={this.handleRemove}>
            Remove word
          </button>
        </form>
        <div className='wordList'>
          <h1>Words to find!</h1>
          <ul onClick={this.activateDelete}>
            {this.state.words.map((word, i) => (
              <li id='wordList' key={word.id} className={word.activate}> #{i + 1}: {word.text}</li>
            ))}
          </ul>
        </div>
        
      </div>
    );
  }

}




export default WordEntry;