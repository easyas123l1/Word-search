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
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
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
      text: this.state.text,
      id: Date.now()
    };

    this.setState(state => ({
      words: state.words.concat(newItem),
      text: ''
    }));
  }

  handleRemove(e) {
    e.preventDefault();

    const table = document.getElementById('#wordList')
    console.log(this.state.words.id);
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
          id="btRemoveWord"
          onClick={this.handleRemove}>
            Remove word
          </button>
        </form>
        <div className='wordList'>
          <h1>Words to find!</h1>
          <ul>
            {this.state.words.map((word, i) => (
              <li id='wordList' key={word.id}> #{i + 1}: {word.text} </li>
            ))}
          </ul>
        </div>
        
      </div>
    );
  }

}




export default WordEntry;