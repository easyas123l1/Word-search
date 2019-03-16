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
      id: Date.now()
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
    const table = document.querySelector('.wordList ul');
    //console.log(table.children.length);
    let newTable = '';
    for (let i = 0; i < table.children.length; i++) {
      newTable += table.children[i].textContent;
    }
    console.log(newTable);

  }

  activeDelete(e) {
    //selects words to be deleted.

    //if word already selected take class active off
    if (e.target.className === "active") {
      e.target.classList.remove("active");
      return;
    }

    //if user somehow clicks UL instead of IL dont do anything.
    if (e.target.tagName === 'UL') {
      return;
    }

    //adds active to class of LI.
    e.target.className = "active";
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
          <ul onClick={this.activeDelete}>
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