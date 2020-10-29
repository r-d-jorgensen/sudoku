import React, { Component } from 'react';
import NumberBox from './numberBox';

class Grid extends Component {
    constructor(props) {
        super(props);
        const size = 9;
        //TODO: outside initalization
        const values = [
            '', '', '', '', '', '', '4', '', '9', '',
            '8', '', '2', '9', '7', '', '', '', '',
            '9', '', '1', '2', '', '', '3', '', '',
            '', '', '', '', '4', '9', '1', '5', '7',
            '', '1', '3', '', '5', '', '9', '', '2',
            '5', '7', '9', '1', '2', '', '', '', '',
            '', '', '7', '', '', '2', '6', '', '3',
            '', '', '', '', '3', '8', '2', '', '5',
            '', '2', '', '5', '', '', '', '', '',
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
                board.push({id: id++, row: row, col: col, quadrent: quadrent, value: values[id]});
            }
        }
        this.state = { board: board };
    }

    handleSolve = () => {

        console.log();
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