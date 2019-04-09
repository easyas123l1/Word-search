import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var PORT = process.env.PORT || 5000;

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
