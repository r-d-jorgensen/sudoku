import React, { Component } from 'react';
import NumberBox from './numberBox';
import Button from '@material-ui/core/Button';

class Sudoku extends Component {
    constructor(props) {
        super(props);
        const size = 9;
        let board = [];
        let id = 0;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) { 
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
                    value: ''
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
        let {board, pathValidity} = this.recursiveSolve(this.state.board);

        if (pathValidity) {
            this.setState({board: board});
        } else {
            this.setState({
                errMsg: "This Sudoku is Unsolvable"
            });
        }
    };

    recursiveSolve = (board) => {
        let emptyLocation = this.nextEmptyBox(board);
        if (emptyLocation === -1) {
            return {board: board, pathValidity: true};
        }
        for (let i = 1; i < 10; i++) {
            if (this.checkBox(board[emptyLocation], i, board)) {
                board[emptyLocation].value = i;
                let path = this.recursiveSolve(board);
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
    checkBox = ({id, row, col, quadrent}, value, board) => {
        const rowBoxes = board.filter(box => { return box.row === row});
        const colBoxes = board.filter(box => { return box.col === col});
        const quadBoxs = board.filter(box => { return box.quadrent === quadrent});
        for (let i = 0; i < 9; i++) {
            if (value === rowBoxes[i].value && rowBoxes[i].value !== '' && rowBoxes[i].id !== id) {
                return false;
            } else if (value === colBoxes[i].value && colBoxes[i].value !== '' && colBoxes[i].id !== id) {
                return false;
            } else if (value === quadBoxs[i].value && quadBoxs[i].value !== '' && quadBoxs[i].id !== id) {
                return false;
            }
        }
        return true;
    }

    handleChange = (value, id) => {
        const board = this.state.board;
        board[id].value = value === '' ? '' : Number(value);
        this.setState({
            board: board,
            errMsg: ''
        }); 
    };

    handleClear = () => {
        const board = this.state.board;
        board.forEach(box => {
            box.value = ''
        });
        this.setState({
            board: board,
            errMsg: ''
        })
    }

    handleTest = () => {
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
        const board = this.state.board;
        board.forEach((box, i) => {
            box.value = values[i];
        });
        this.setState({
            board: board,
            errMsg: ''
        })
    }

    render() {
        //TODO: change row maping to quadrent maping then style
        
        const grid = [];
        for (let i = 0; i < 9; i++) {
            const quadrent = [];
            const board = this.state.board.filter(box => box.quadrent === i);
            for (let i = 0; i < 9; i += 3) {
                quadrent.push(board.slice(i, i + 3));
            }
            grid.push(quadrent);
        }
        return (
            <div className="content">
                <h1>SUDOKU SOLVER</h1>
                <div className="sudoku-grid">
                    {grid.map((quadrent, j) =>
                        <div className="quadrent" key={j}>
                            {quadrent.map((row, k) => 
                                <div key={k}>
                                    {row.map(box => 
                                        <NumberBox key={box.id} value={box.value} onChange={this.handleChange} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <br />
                <p className="errMsg"
                    visibility={this.state.errMsg === '' ? 'hidden' : 'visible'} >
                    {this.state.errMsg}
                </p>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleTest} >
                    Test
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.errMsg === '' ? false : true}
                    onClick={this.handleSolve} >
                    Solve
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleClear} >
                    Clear
                </Button>
                <div className="expainingText" >
                    This system is meant to solve Sundoku puzzles.
                    Just enter the numbers in or to see how it works press the "Test" Button.
                    When ready to have it solve press the "Solve" Button.
                    It will ether come back with a complete puzzle or will say that it is Unsolvable.
                </div>
            </div>
        );
    }
}

export default Sudoku;