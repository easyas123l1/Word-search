import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import WordEntry from './Components/WordEntry/WordEntry';
import WordSearch from './Components/WordSearch/WordSearch';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={
            () => {
              return (
                <div>
                  <Navigation />
                  <WordEntry /> 
                </div>
              )
            }
          }/>
          <Route path="/WordSearch" exact render={
            () => {
              return (
                <div>
                  <Navigation />
                  <WordSearch />
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
