import React, { Component } from 'react';

import './WordEntry.css';
import {Redirect} from 'react-router-dom';

class WordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generatePuzzle: false
    };

    this.generatePuzzle = this.generatePuzzle.bind(this);
  }

  generatePuzzle(e) {
    if (!this.state.generatePuzzle) {
      this.setState({generatePuzzle: true});
    }
  }

  render() {
    if (this.state.generatePuzzle) {
      return <Redirect to="/WordSearch" push/>
    }
    return (
      <div className='wordInput'>
        <p>Enter a word:</p>
        <form
          onSubmit = {this.props.hanldeSubmit}
          >
          <input type="text"
          id='new-word'
          onChange={this.props.handleChange}
          value={this.props.text}
          />
          <button 
          id="btnAddWord"
          onClick={this.props.handleSubmit}>
            Add word #{this.props.words.length + 1}
          </button>
          <button
          id="btnRemoveWord"
          onClick={this.props.handleRemove}>
            Remove word
          </button>         
        </form>
        <form>
          <p>Pick a size</p>
          <input type="radio" name="size" value="14" defaultChecked={true}/> 14x14
          <input type="radio" name="size" value="16"/> 16x16
          <input type="radio" name="size" value="18"/> 18x18
        </form>
        <div className='wordList'>
          <h1>Words to find!</h1>
          <ul onClick={this.props.activateDelete}>
            {this.props.words.map((word, i) => (
              <li id='wordLists' key={word.id} className={word.activate}> #{i + 1}: {word.text}</li>
            ))}
          </ul>
        </div>
        <button
        id="btnGeneratePuzzle"
        onClick={this.generatePuzzle}>
          Generate Puzzle
        </button>
      </div>
    );
  }

}




export default WordEntry;