import React, {useState} from "react";
import ReactDOM from "react-dom";
import './index.css';

const Square = (props) => {
    if(props.value) {
        return (<button className="black-square" onClick={() => props.onClick()}/>)
    } else {
        return (<button className="white-square" onClick={() => props.onClick()}/>)
    }
};

const Board = (props) => {
    return (
        <div>
            {
                props.squares.map((item, itemIndex) => {
                    return (
                        <div key={itemIndex} className="board-row">
                            {
                                item.map( (column, columnIndex) =>  {
                                    return (
                                        <Square
                                            key={columnIndex}
                                            value={props.squares[itemIndex][columnIndex]}
                                            onClick={() => props.onClick(itemIndex, columnIndex)}
                                        />
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};


const Game = (props) => {
    const [state, updateState] = useState({
        rows: 3,
        columns: 3,
        squares: [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ]
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = parseInt(target.value);
        const name = target.name;
        const array = state.squares.slice();
        if (name === 'rows') {
            const difference = value - state.rows;
            console.log(difference);
            if (difference > 0) {
                for (let i = 0; i < difference; i++) {
                    const row = [];
                    for (let j = 0; j < state.columns; j++) {
                        row.push(false);
                    }
                    array.push(row);
                }
            } else {
                array.splice(difference);
            }
        } else {
            const difference = value - state.columns;
            if (difference > 0) {
                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < difference; j++) {
                        array[i].push(false);
                    }
                }
            } else {
                for (let i = 0; i < array.length; i++) {
                    array[i].splice(difference);
                }
            }
        }
        updateState({ ...state, squares: array, [name]: value })
    };

    const onClick = (i, j) => {
        const squares = state.squares.slice();
        squares[i][j] = !squares[i][j];
        updateState({ ...state, squares })
    };

    return (
        <div>
            <input name="rows"
                   type="number"
                   value={state.rows}
                   onChange={(event) => handleInputChange(event)}
            />
            X
            <input name="columns"
                   type="number"
                   value={state.columns}
                   onChange={(event) => handleInputChange(event)}
            />
            <div className="game">
                <div className="game-board">
                    <Board
                        rows={state.rows}
                        columns={state.columns}
                        squares={state.squares}
                        onClick={onClick}
                    />
                </div>
            </div>
        </div>
    );
};


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
