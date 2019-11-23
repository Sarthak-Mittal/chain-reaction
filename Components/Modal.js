import React from "react"
import '../css/modal.scss'

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
                        <button onClick={this.props.onClose}> {this.props.btnText} </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;