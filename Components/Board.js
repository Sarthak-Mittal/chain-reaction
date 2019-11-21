import React from "react"
import Cell from "./Cell"

class Board extends React.Component {

    state={
        boardData : this.initBoardData(this.props.height, this.props.width),
        whoseTurn : "p1"
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
        if(  (p1Cells + p2Cells) > 1){
            if(p1Cells === 0){
                alert("player 2 won")
            }else if(p2Cells === 0){
                alert("player 1 won")
            }    
        }
    }

    burst(x,y){
        let updatedData = this.state.boardData 
        updatedData[x][y].owner = this.state.whoseTurn

        if(updatedData[x][y].val < 3){
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

        // setTimeout(function() {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return(
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell 
                            onClick = {() => this.handleCellClick(dataitem.x,dataitem.y)}
                            data = {dataitem}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>
                )
            })
        })
    // }.bind(this), 200)

    }

    render() {  
        return (
            <div> { this.renderBoard(this.state.boardData) } </div>
        );
    }
}

export default Board
