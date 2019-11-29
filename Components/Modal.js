import React from "react"
import '../css/modal.scss'
import Button from "./Button"

class Modal extends React.Component{

    render(){
        if(!this.props.show){
            return null
        }
        
        return(
            <div className="backdrop" > 
                <div className="modal" >
                    {this.props.children}
                    <div className="modalFooter">
                        <Button 
                          btnText={this.props.btnText} 
                          onClick={this.props.onClose} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;