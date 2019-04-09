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
        <p>Pick a size</p>
        <form className='wordSize'>
          <input 
          type="radio" 
          name="size" 
          value="10" 
          checked={this.props.size === "10"}
          onChange={this.props.handleSizeChange}
          /> 
          10x10
          <input 
          type="radio" 
          name="size" 
          value="12"
          checked={this.props.size === "12"}
          onChange={this.props.handleSizeChange}
          />
          12x12
          <input 
          type="radio" 
          name="size" 
          value="14"
          checked={this.props.size === "14"}
          onChange={this.props.handleSizeChange}
          />
           14x14
           <input 
          type="radio" 
          name="size" 
          value="16"
          checked={this.props.size === "16"}
          onChange={this.props.handleSizeChange}
          />
           16x16
           <input 
          type="radio" 
          name="size" 
          value="18"
          checked={this.props.size === "18"}
          onChange={this.props.handleSizeChange}
          />
           18x18
           <input 
          type="radio" 
          name="size" 
          value="20"
          checked={this.props.size === "20"}
          onChange={this.props.handleSizeChange}
          />
           20x20
           <input 
          type="radio" 
          name="size" 
          value="22"
          checked={this.props.size === "22"}
          onChange={this.props.handleSizeChange}
          />
           22x22
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