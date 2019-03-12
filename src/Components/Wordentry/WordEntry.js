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
      text: this.state.text
    };

    this.setState(state => ({
      words: state.words.concat(newItem),
      text: ''
    }));
  }

  render() {
    return (
      <div className='wordInput'>
        <p>Enter a word:</p>
        <input 
        id='new-word'
        onChange={this.handleChange}
        value={this.state.text}
        //vvv trying to figure out how to addword off hitting Enter.  not working.
        onKeyPress = "if (event.key == 'Enter') {this.handleSubmit}"
        />
        <button 
        id="btnAddWord"
        onClick={this.handleSubmit}>
          Add word #{this.state.words.length + 1}
        </button>
        <div className='wordList'>
          <h1>Words to find!</h1>
          <ul>
            {this.state.words.map(word => (
              <li key={word.id}> {word.text} </li>
            ))}
          </ul>
        </div>
        
      </div>
    );
  }

}




export default WordEntry;