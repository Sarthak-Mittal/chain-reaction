import React from "react"
import Cell from "./Cell"
import Modal from "./Modal"
import Button from "./Button"

class Board extends React.Component {

    state={
        boardData : this.initBoardData(this.props.height, this.props.width),
        whoseTurn : "p1",
        modalShowWinResult : false,
        winResultMessage : null,
        modalRules : false,
        gameRules : "These are game rules"
    }

    initBoardData(height, width){
        let data = this.createEmptyArray(height,width)
        return data
    }

    createEmptyArray(height, width){
        let data = []

        for(let i=0; i<height;i++){
            data.push([])
            for(let j=0;j<width;j++){
                data[i][j] = {
                    x : i,
                    y : j,
                    val : null,
                    owner : null
                }
            }
        }
        return data
    }

    handleCellClick(x,y){
        
        let cellClicked = this.state.boardData[x][y].owner

        //Checking if cell clicked is not owned by opponent
        if( cellClicked === this.state.whoseTurn || cellClicked === null){
            this.burst(x,y)
            this.changeTurn()
            this.checkWinner()   
        }
    }
    
    refreshGrid = () => {
        let g = this.initBoardData(this.props.height, this.props.width)
        this.setState({ boardData : g })
    }

    checkWinner(){
        let grid = this.state.boardData
        let p1Cells = 0
        let p2Cells = 0

        for(let i=0; i<this.props.height;i++){
            for(let j=0;j<this.props.width;j++){
                if(grid[i][j].owner === "p1"){ p1Cells+=1 }
                else if(grid[i][j].owner === "p2"){ p2Cells+=1 }
            }
        }
        if( (p1Cells + p2Cells) > 1){
            if(p1Cells === 0){        
                setTimeout(function() {
                    this.showWinResultModal("Red won")
                    this.refreshGrid()
                }.bind(this), 400)

                
            }else if(p2Cells === 0){
                setTimeout(function() {
                    this.showWinResultModal("Blue won")
                    this.refreshGrid()
                }.bind(this), 400)
            }
        }
    }

    burst(x,y){
        let updatedData = this.state.boardData 
        updatedData[x][y].owner = this.state.whoseTurn

        if(updatedData[x][y].val < this.checkBurstLimit(x,y)){
            updatedData[x][y].val += 1;
        }else {
            //set current cell to null state
            updatedData[x][y].val = null;
            updatedData[x][y].owner = null;
    
            //increment neighbours by One
            this.incrementNeighbours(x,y)
        }
        this.setState({ boardData : updatedData })
    }

    checkBurstLimit(x,y){

        let limit = 0
        if(x ===  0 || x === this.props.height-1 || y === 0 || y === this.props.width-1){
            
            //All 4 corners
            if( (x === y && x===0) || 
                (x===0 && y===this.props.width-1) || 
                (x === this.props.height-1 && y===0) || 
                (x === this.props.height-1 && y===this.props.width-1)
            ){ limit = 1 }
                        
            //All edges except corner
            else if( (x === 0) || 
                     (x === this.props.height-1) || 
                     (y === 0) || 
                     (y === this.props.width-1)
            ){ limit = 2 }
        }else{
            limit = 3
        }

        return limit
    }

    incrementNeighbours(x,y){

        if(x ===  0 || x === this.props.height-1 || y === 0 || y === this.props.width-1){
            //top left corners
            if( x === y && x===0){ this.burst(x+1,y); this.burst(x,y+1); }
            //top right corners
            else if (x===0 && y===this.props.width-1){ this.burst(x+1,y); this.burst(x,y-1); }
            //bottom left corners
            else if(x === this.props.height-1 && y===0){ this.burst(x-1,y); this.burst(x,y+1); }
            //bottom right corners
            else if(x === this.props.height-1 && y===this.props.width-1){ this.burst(x,y-1); this.burst(x-1,y); }
            //top row
            else if(x === 0){ this.burst(x,y+1); this.burst(x,y-1); this.burst(x+1,y); }
            //bottom row
            else if(x === this.props.height-1){ this.burst(x,y+1); this.burst(x,y-1); this.burst(x-1,y); }
            //leftmost row
            else if(y === 0){ this.burst(x+1,y); this.burst(x-1,y); this.burst(x,y+1); }
            //rightmost row
            else if(y === this.props.width-1){ this.burst(x+1,y); this.burst(x-1,y); this.burst(x,y-1) }
        }else{
            this.burst(x-1,y);this.burst(x+1,y);this.burst(x,y-1);this.burst(x,y+1);
        }

    }

    changeTurn(){
             if(this.state.whoseTurn === "p1"){ this.setState({ whoseTurn : "p2" }) }
        else if(this.state.whoseTurn === "p2"){ this.setState({ whoseTurn : "p1" }) }
    }

    renderBoard(data){

        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return(
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell 
                            onClick = {() => this.handleCellClick(dataitem.x,dataitem.y)}
                            data = {dataitem}
                            turnOf = {this.state.whoseTurn}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>
                )
            })
        })
    }

    hideModalWinResult = () => {   this.setState({ modalShowWinResult : false })   }
    hideRulesModal = () => {   this.setState({ modalRules : false })   }

    showWinResultModal = (message) => {   
        this.setState({ winResultMessage : message, modalShowWinResult : true })    
    }

    showRulesModal = () => {   
        this.setState({ modalRules : true })   
    }

    render() {  
        return (
            <div className="box">
                <div className="game-head">
                  <span>CHAIN REACTION</span>
                </div>
                <div className="grid"> { this.renderBoard(this.state.boardData) } </div>

                {/* Win result modal */}
                <Modal show={this.state.modalShowWinResult} onClose={this.hideModalWinResult} btnText="Restart">
                    <h4>{this.state.winResultMessage}</h4>
                </Modal>

                {/* Game Rules Modal */}
                <Modal show={this.state.modalRules} onClose={this.hideRulesModal} btnText=" X ">
                    {/* <h4>{this.state.gameRules}</h4> */}
                    <p className="rules-para">Chain Reaction is strategy game where sole aim of a player is to own board by eliminating the opponent.</p>
                    <p className="rules-para">A player can only place obrs in a blank cell or a cell that contains orbs of their own color.</p>
                    <p className="rules-para">Once a cell has reached threshold, the orbs split into surrounding cells adding an extra orb and claiming the cell for player.</p>
                    <p className="rules-para">As soon as a player looses all their orbs they are eliminated from game.</p>
                    <p className="rules-para">The winner is the one who eliminates opponent's all the cell.</p>
                </Modal>
                <Button btnText="Rules" onClick={this.showRulesModal} />
                <Button btnText="Refresh" onClick={this.refreshGrid} />

            </div>
        );
    }
}

export default Board
