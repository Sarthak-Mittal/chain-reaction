import React from "react"
import {bounceIn} from 'react-animations'
import Radium, {StyleRoot} from 'radium'

const styles = {
  bounce : {
    animation : 'x 1s',
    animationName : Radium.keyframes(bounceIn, 'bounceIn')
  }
}

class Cell extends React.Component {
  
    render() {
      const{data, onClick} = this.props
      let className = "cell"  
      
      if(data.owner === "p1"){
        if(data.val === 0 ){ className = "cell p1" }
        else if(data.val === 1 ){ className = "cell energy1 p1" }
        else if(data.val === 2 ){ className = "cell energy2 p1" }
        else if(data.val === 3 ){ className = "cell energy3 p1" }
      }else if(data.owner === "p2"){
        if(data.val === 0 ){ className = "cell p2" }
        else if(data.val === 1 ){ className = "cell energy1 p2" }
        else if(data.val === 2 ){ className = "cell energy2 p2" }
        else if(data.val === 3 ){ className = "cell energy3 p2" }  
      }

      return (
        <StyleRoot>
          <div onClick = {onClick} className = {className} > <div style={styles.bounce}>{data.val}</div> </div>
        </StyleRoot>
      );
    }
  }

export default Cell