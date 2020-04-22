import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import chunk from 'lodash/chunk';

function Square(props) {
    if(props.value) {
        return (<button className="black-square" onClick={props.onClick}/>)
    } else {
        return (<button className="white-square" onClick={props.onClick}/>)
    }
}

class Board extends React.Component {

    renderSquare(j) {
        return (
            <Square
                key={j}
                value={this.props.squares[j]}
                onClick={() => this.props.onClick(j)}
            />
        );
    }

    render() {
        return (
            <div>
                {
                    chunk(this.props.squares, this.props.columns).map((item, itemIndex) => {
                        return (
                            <div key={itemIndex} className="board-row">
                                {
                                    item.map( (column, columnIndex) =>  {
                                        return (this.renderSquare(itemIndex * this.props.columns + columnIndex))
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
            squares: Array(9).fill(false)
        };
    }

    onClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = !squares[i];
        this.setState({ squares: squares })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let valueTwo;
        if (name === 'rows') {
            valueTwo = this.state.columns;
        } else {
            valueTwo = this.state.rows;
        }
        const array = new Array(value * valueTwo).fill(false);
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
