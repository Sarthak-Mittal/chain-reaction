import React from "react"
import {height, width} from '../index.js'

const styles = {
}

class Cell extends React.Component {
  
  checkCellPosition(x,y){

    let posType = null
    if(x ===  0 || x === height-1 || y === 0 || y === width-1){
        
        //All 4 corners
        if((x === y && x===0) || (x===0 && y=== width-1) || (x ===  height-1 && y===0) || (x ===  height-1 && y=== width-1)){
          posType = "corner" 
        }
                    
        //All edges except corner
        else if( (x === 0) || (x ===  height-1) || (y === 0) || (y ===  width-1)){ 
          posType = "edge" 
        }
    }else{
        posType = "regular"
    }
    return posType
}


    render() {
      const{data, onClick,turnOf} = this.props
      let className = "cell" 
      let position = this.checkCellPosition(data.x,data.y)
      
      if(turnOf === "p1" ){
        className =  `turnOfp1 ${className}`
      }else if(turnOf === "p2" ){
        className =  `turnOfp2 ${className}`
      }

      if(data.owner === "p1"){
        className =  `p1 ${className}`
      }else if(data.owner === "p2"){
        className =  `p2 ${className}`
      }


      if(position === "regular"){
        if(data.val === 1 ){ className = `${className} regular1` }
        else if(data.val === 2 ){ className = `${className} regular2` }
        else if(data.val === 3 ){ className = `${className} regular3` }
      }else if(position === "edge"){
        if(data.val === 1 ){ className = `${className} edge1` }
        if(data.val === 2 ){ className = `${className} edge2` }
      }else if(position === "corner"){
        if(data.val === 1 ){ className = `${className} corner1` }
      }

      return (
          <div onClick = {onClick} className = {className} > 
            <div style={styles.bounce}>
              {data.val}
            </div>
          </div>
      );
    }
  }

export default Cell