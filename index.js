import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Components/Board';
import './css/style.scss'

class Game extends React.Component {
    state = {
      height: 9,
      width: 9
    };
  
    render() {
      const { height, width } = this.state;
      return (
        <div className="game">
          <Board height={height} width={width} />
        </div>
      );
    }
  }

ReactDOM.render(<Game />, document.getElementById('root'));

