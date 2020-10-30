import React, { Component } from 'react';
import NumberBox from './numberBox';

const testCheck = [
    7, 3, 5, 6, 1, 4, 8, 9, 2,
    8, 4, 2, 9, 7, 3, 5, 6, 1,
    9, 6, 1, 2, 8, 5, 3, 7, 4,
    2, 9, 6, 3, 4, 9, 1, 5, 7,
    4, 1, 3, 8, 5, 7, 9, 2, 6,
    5, 7, 9, 1, 2, 6, 4, 3, 8,
    1, 5, 7, 4, 9, 2, 6, 8, 3,
    6, 9, 4, 7, 3, 8, 2, 1, 5,
    3, 2, 8, 5, 6, 1, 7, 4, 9,
];

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
                board.push({id: id, row: row, col: col, quadrent: quadrent,
                    value: values[id], given: values[id] === "" ? false : true});
                id++;
            }
        }
        this.state = { board: board };
    }

    handleSolve = () => {
        const board = this.state.board;
        let sovled = false;
        let index = 0;
        let loopBreaker = 100;
        let guess = 1;
        while (!sovled && index < 81 && loopBreaker > 0) {
            if (board[index].value === "")
                board[index].value = guess;
            else if (board[index].given === false) {
                board[index].value = guess;
            }

            if (this.checkSquare(board[index])) {
                guess = 1;
                index++;
            } else {
                guess++
            }
            loopBreaker--;
        }

        let temp = '';
        for (let i = 1; i <= 81; i++) {
            
            board[i-1].value === testCheck[i-1] ? temp += '1, ' : temp += "0, "
            if (i % 9 === 0) {
                temp += "\n";
            }
        }
        console.log(temp);
        this.setState({board: board});
    };

    checkSquare = ({row, col, quadrent}) => {
        const rowBoxes = this.state.board.filter(box => { return box.row === row});
        const colBoxes = this.state.board.filter(box => { return box.col === col});
        const quadBoxs = this.state.board.filter(box => { return box.quadrent === quadrent});
        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 9; j++){
                if (rowBoxes[i].value === rowBoxes[j].value
                    && rowBoxes[i].value !== '' && rowBoxes[j].value !== '') {
                    //console.log("bad row");
                    return false;
                } else if (colBoxes[i].value === colBoxes[j].value
                    && colBoxes[i].value !== '' && colBoxes[j].value !== '') {
                    //console.log("bad col");
                    return false;
                } else if (quadBoxs[i].value === quadBoxs[j].value
                    && quadBoxs[i].value !== '' && quadBoxs[j].value !== '') {
                    //console.log("bad quadrent");
                    return false;
                }
            }
        }
        return true;
    }


    handleChange = (value, id) => {
        //TODO: valadate input 1-9
        const board = this.state.board;
        board[id].value = value;
        this.setState({board: board}); 
    };

    render() {
        //TODO: fix row maping to quadrent maping
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
                <button onClick={this.handleSolve} >Solve</button>
            </div>
        );
    }
}

export default Grid;