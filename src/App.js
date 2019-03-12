import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import WordEntry from './Components/WordEntry/WordEntry';
import WordList from './Components/WordList/WordList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <WordEntry />
        <WordList />
      </div>
    );
  }
}

export default App;
