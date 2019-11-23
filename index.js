import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Components/Board';
import './css/style.scss'

const height = 13
const width = 9


class Game extends React.Component {
    state = {
      height: height,
      width: width
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

export {height};
export {width};