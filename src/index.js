import React from "react";
import ReactDOM from "react-dom";
import './index.css';

function Square(props) {
    if(props.value) {
        return (<button className="black-square" onClick={() => props.onClick()}/>)
    } else {
        return (<button className="white-square" onClick={() => props.onClick()}/>)
    }
}

class Board extends React.Component {

    renderSquare(i, j) {
        return (
            <Square
                key={j}
                value={this.props.squares[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.squares.map((item, itemIndex) => {
                        return (
                            <div key={itemIndex} className="board-row">
                                {
                                    item.map( (column, columnIndex) =>  {
                                        return (this.renderSquare(itemIndex, columnIndex))
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 3,
            columns: 3,
            squares: [
                [false, false, false],
                [false, false, false],
                [false, false, false],
            ]
        };
    }

    onClick = (i, j) => {
        const squares = this.state.squares.slice();
        squares[i][j] = !squares[i][j];
        this.setState({ squares: squares })
    };

    handleInputChange(event) {
        const target = event.target;
        const value = parseInt(target.value);
        const name = target.name;
        const array = this.state.squares.slice();
        if (name === 'rows') {
            const difference = value - this.state.rows;
            console.log(difference);
            if (difference > 0) {
                for (let i = 0; i < difference; i++) {
                    const row = [];
                    for (let j = 0; j < this.state.columns; j++) {
                        row.push(false);
                    }
                    array.push(row);
                }
            } else {
                array.splice(difference);
            }
        } else {
            const difference = value - this.state.columns;
            console.log(difference);
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
        console.log(array);
        this.setState({
            [name]: value,
            squares: array
        });
    }

    render() {
        return (
            <div>
                <input name="rows"
                       type="number"
                       value={this.state.rows}
                       onChange={(event) => this.handleInputChange(event)}
                />
                X
                <input name="columns"
                       type="number"
                       value={this.state.columns}
                       onChange={(event) => this.handleInputChange(event)}
                />
                <div className="game">
                    <div className="game-board">
                        <Board
                            rows={this.state.rows}
                            columns={this.state.columns}
                            squares={this.state.squares}
                            onClick={this.onClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
