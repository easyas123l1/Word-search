import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import WordEntry from './Components/WordEntry/WordEntry';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <WordEntry />
      </div>
    );
  }
}

export default App;
