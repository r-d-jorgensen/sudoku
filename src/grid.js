import React, { Component } from 'react';
import NumberBox from './numberBox';

class Grid extends Component {
    constructor(props) {
        super(props);
        const size = 9;
        //TODO: outside initalization
        const values = [
            '', '', '', '', '', 4, '', 9, '',
            8, '', 2, 9, 7, '', '', '', '',
            9, '', 1, 2, '', '', 3, '', '',
            '', '', '', '', 4, 9, 1, 5, 7,
            '', 1, 3, '', 5, '', 9, 2, '',
            5, 7, 9, 1, 2, '', '', '', '',
            '', '', 7, '', '', 2, 6, '', 3,
            '', '', '', '', 3, 8, 2, '', 5,
            '', 2, '', 5, '', '', '', '', '',
        ];
        let board = [];
        let id = 0;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) { 
                //TODO: find elegant equation for quadrent
                let quadrent = 0;
                if (row > 5) {
                    quadrent = 6;
                } else if (row > 2) {
                    quadrent = 3;
                }
                if (col > 5) {
                    quadrent += 2;
                } else if (col > 2) {
                    quadrent += 1;
                }
                board.push({id: id,
                    row: row,
                    col: col,
                    quadrent: quadrent,
                    value: values[id],
                    given: values[id] === "" ? false : true
                });
                id++;
            }
        }
        this.state = {
            board: board,
            errMsg: ''
        };
    }

    handleSolve = () => {
        let {board, pathValidity} = this.pathTracer(this.state.board);
        //TODO: final check of board
        for (let i = 0; i < 81; i++) {
            if (!this.checkBox(board[i])) {
                pathValidity = false;
            }
        }
        if (pathValidity) {
            this.setState({board: board});
        } else {
            this.setState({
                errMsg: "This Sudoku is Unsolvable"
            });
        }

        /* manual check method
            const testCheck = [
                7, 3, 5, 6, 1, 4, 8, 9, 2,
                8, 4, 2, 9, 7, 3, 5, 6, 1,
                9, 6, 1, 2, 8, 5, 3, 7, 4,
                2, 8, 6, 3, 4, 9, 1, 5, 7,
                4, 1, 3, 8, 5, 7, 9, 2, 6,
                5, 7, 9, 1, 2, 6, 4, 3, 8,
                1, 5, 7, 4, 9, 2, 6, 8, 3,
                6, 9, 4, 7, 3, 8, 2, 1, 5,
                3, 2, 8, 5, 6, 1, 7, 4, 9,
            ];
            let temp = '';
            let correct = true;
            for (let i = 1; i <= 81; i++) {
                if (board[i-1].value === testCheck[i-1]) {
                    temp += '1, '
                } else {
                    temp += "0, "
                    correct = false;
                }
                if (i % 9 === 0) {
                    temp += "\n";
                }
            }
            console.log(correct);
            console.log(temp);
        */
        
    };

    pathTracer = (board) => {
        let emptyLocation = this.nextEmptyBox(board);
        if (emptyLocation === -1) {
            return {board: board, pathValidity: true};
        }
        for (let i = 1; i < 10; i++) {
            if (this.checkBox(board[emptyLocation], i)) {
                board[emptyLocation].value = i;
                let path = this.pathTracer(board);
                if (path.pathValidity) {
                    return {board: board, pathValidity: true};
                } else {
                    board[emptyLocation].value = '';
                }
            }
        }
        return {board: board, pathValidity: false};
    };

    nextEmptyBox = (board) => {
        for ( let i = 0; i < 81; i++) {
            if (board[i].value === '') {
                return board[i].id;
            }
        }
        return -1;
    };

    //find if value works for Box
    checkBox = ({id, row, col, quadrent}, value) => {
        const rowBoxes = this.state.board.filter(box => { return box.row === row});
        const colBoxes = this.state.board.filter(box => { return box.col === col});
        const quadBoxs = this.state.board.filter(box => { return box.quadrent === quadrent});
        for (let i = 0; i < 9; i++) {
            if (rowBoxes[i].id !== id){
                if (value === rowBoxes[i].value && rowBoxes[i].value !== '') {
                    //console.log("bad row");
                    return false;
                } else if (value === colBoxes[i].value && colBoxes[i].value !== '') {
                    //console.log("bad col");
                    return false;
                } else if (value === quadBoxs[i].value && quadBoxs[i].value !== '') {
                    //console.log("bad quadrent");
                    return false;
                }
            }
        }
        return true;
    }

    handleChange = (value, id) => {
        let errMsg = '';
        //TODO: there has to be a better way of doing this
        if (value !== 1 || value !== 2 || value !== 3 || value !== 4 ||
            value !== 5 || value !== 6 || value !== 7 || value !== 8 ||
            value !== 9) {
            errMsg = 'Enter at number between 1 and 9'
        }
        const board = this.state.board;
        board[id].value = value;
        this.setState({
            board: board,
            errMsg: errMsg
        }); 
    };

    render() {
        //TODO: change row maping to quadrent maping then style
        const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        return (
            <div>
                <div >
                    {rows.map(row =>
                        <div key={row}>
                            {this.state.board.slice(row * 9, row * 9 + 9).map((box) =>
                                <NumberBox
                                    key={box.id}
                                    id={box.id}
                                    value={box.value}
                                    onChange={this.handleChange} />
                            )}
                        </div>
                    )}
                </div>
                <button
                    disabled={this.state.errMsg === '' ? false : true}
                    onClick={this.handleSolve} >
                    Solve
                </button>
                <p visibility={this.state.errMsg === '' ? 'hidden' : 'visible'}>{this.state.errMsg}</p>
            </div>
        );
    }
}

export default Grid;