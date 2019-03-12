import React, {Component} from 'react';

import './WordList.css';
import '../WordEntry/WordEntry';
import { SSL_OP_NO_QUERY_MTU } from 'constants';

class WordList extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
        <ul>
          {this.props.words.map(word => (
            <li key={word.id}>{word.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default WordList;