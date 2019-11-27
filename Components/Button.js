import React from "react"
import "../css/button.scss"

class Button extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <button className="myButton" onClick={this.props.onClick}>                {this.props.btnText}
      </button>
    )
  }

}

export default Button