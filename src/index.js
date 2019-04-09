import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

App.set( 'prop', ( process.env.PORT || 5000 ));

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
