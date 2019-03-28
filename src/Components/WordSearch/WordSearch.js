import React, { Component } from 'react';

import './WordSearch.css';

class WordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 16
    }

    this.wordSearch = this.wordSearch.bind(this);
  }

  wordSearch(e) {
    let line = '';
    console.log(this.state.size);
    for (let i = 0; this.state.size > i; i++) {
        line += '<br>';
      for (let i2 = 0; this.state.size > i2; i2++) {
        line += '-  ';
      }
    }
    console.log(line);
  }

  render() {
    return (
      <div className="wordSearch">
      <div>
        <button
        onClick={this.wordSearch}>
          showWord List
        </button>
      </div>
        <ul>
          {this.props.words.map((word, i) => (
            <li id='wordList' key={word.id}> #{i + 1}: {word.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default WordSearch;