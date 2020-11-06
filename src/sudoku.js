import React, { Component } from 'react';
import NumberBox from './numberBox';
import { Button, ThemeProvider, createMuiTheme } from '@material-ui/core';

class Sudoku extends Component {
    constructor(props) {
        super(props);
        //create empty board
        const size = 9;
        let board = [];
        for (let i = 0; i < size * size; i++ ) {
            let quadrent = 0;
            let row = Math.floor(i / size);
            let col = i % size;
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
            board.push({id: i,
                row: row,
                col: col,
                quadrent: quadrent,
                value: ''
            });
        }
        this.state = {
            board: board,
            msg: 'Enter a Puzzle for Solving',
            disableSolve: false
        };
    }

    //solve sudoku on the board in state
    handleSolve = () => {
        //call recursion
        let {board, pathValidity} = this.recursiveSolve(this.state.board);
        //double check for misses
        for (let i = 0; i < 80; i++) {
            if (!this.checkBox(board[i], board[i].value, board)) {
                pathValidity = false;
            }
        }
        if (pathValidity) {
            this.setState({
                board: board,
                msg: "The Sudoku was Solvable",
                disableSolve: true
            });
        } else {
            this.handleClear();
            this.setState({
                msg: "The Sudoku was Unsolvable",
                disableSolve: true
            });
        }
    };

    //exit recursion when no more locations to fill or no correct spot
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

    //find empty location on board
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

    //input is already filtered just changing state of board
    handleChange = (value, id) => {
        const board = this.state.board;
        board[id].value = value === '' ? '' : Number(value);
        this.setState({
            board: board,
            msg: 'Would you like to Solve?',
            disableSolve: false
        }); 
    };

    //set all values in board to zero
    handleClear = () => {
        const board = this.state.board;
        board.forEach(box => {
            box.value = ''
        });
        this.setState({
            board: board,
            msg: 'Enter some Values.',
            disableSolve: false
        })
    }

    //creates static test puzzle
    //TODO: change to creating puzzles dynamicly or reading from puzzles doc
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
            msg: 'Try the Solve button',
            disableSolve: false
        })
    }

    render() {
        //TODO: shift <p>, Mask, and div to material-ui or make button not and add css for it
        const theme = createMuiTheme({
            overrides: {
                MuiButton: {
                    root: {
                    margin: "0px 15px",
                    height: "40px",
                    width: "125px",
                    }
                }
            },
            palette: {
                primary: {
                    main: "#800000",
                },
                secondary: {
                    main: "#1800a0",
                },
            },
        });
        return (
            <div className="content">
                <h1 className="title" >SUDOKU SOLVER</h1>
                <div className="sudoku-grid">
                    {//dynamic creation of the board from state
                    //TODO: look into not using [1...8] array for mapping
                    [0,1,2,3,4,5,6,7,8].map(quad =>
                    this.state.board.filter(box => box.quadrent === quad)).map((quadrent, i) =>
                        <div className="quadrent" key={i}>
                            {quadrent.map(box => 
                                <NumberBox
                                    key={box.id}
                                    id={box.id}
                                    value={box.value}
                                    onChange={this.handleChange} />
                            )}
                        </div>
                    )}
                </div>
                <div className="msgBox" >
                    <p>
                        {this.state.msg}
                    </p>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={this.handleTest} >
                            Test
                        </Button>
                        <Button
                            color="primary"
                            variant="contained" 
                            disabled={this.state.disableSolve}
                            onClick={this.handleSolve} >
                            Solve
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={this.handleClear} >
                            Clear
                        </Button>
                    </ThemeProvider>
                </div>
                <div className="expainingBox" >
                    <p>
                        This system is meant to solve Sudoku puzzles.
                        <br />
                        Just enter the numbers in, or to see how it works press the "Test" Button.
                        When ready to have it solve press the "Solve" Button.
                        It will either come back with a complete puzzle or will say that it is Unsolvable.
                    </p>
                </div>
            </div>
        );
    }
}

export default Sudoku;