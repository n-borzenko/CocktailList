import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "react-virtualized";

import Cocktail from "../Cocktail";

import "./Cocktails.css";

const CELL_HEIGHT_SMALL = 320;
const CELL_HEIGHT_LARGE = 442;
const CELL_WIDTH = 256;

class Cocktails extends Component {
    static sizes = {
        small: "small",
        large: "large",
    };

    static propTypes = {
        size: PropTypes.oneOf(Object.values(Cocktails.sizes)).isRequired,
        values: PropTypes.array.isRequired,
        linkCreator: PropTypes.func.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    static defaultProps = {
        size: Cocktails.sizes.large,
        width: 0,
        height: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            columnsCount: Math.floor(props.width / CELL_WIDTH),
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            columnsCount: Math.floor(props.width / CELL_WIDTH),
        };
    }

    cellRenderer = ({
        columnIndex,
        key,
        rowIndex,
        style,
        isScrolling,
        isVisible,
    }) => {
        const index = rowIndex * this.state.columnsCount + columnIndex;
        if (index >= this.props.values.length) {
            return null;
        }
        const cocktail = this.props.values[index];
        const content =
            isScrolling && !isVisible ? (
                <div
                    className={`cocktails__stub cocktails__stub_${
                        this.props.size
                    }`}
                />
            ) : (
                <Cocktail
                    value={cocktail}
                    to={this.props.linkCreator(cocktail.idDrink)}
                />
            );
        return (
            <div key={key} style={style}>
                {content}
            </div>
        );
    };

    render() {
        if (
            !this.props.values ||
            this.props.values.length === 0 ||
            this.props.width === 0 ||
            this.props.height === 0
        ) {
            return null;
        }

        return (
            <Grid
                cellRenderer={this.cellRenderer}
                columnCount={this.state.columnsCount}
                rowCount={Math.ceil(
                    this.props.values.length / this.state.columnsCount
                )}
                columnWidth={CELL_WIDTH}
                rowHeight={
                    this.props.size === Cocktails.sizes.large
                        ? CELL_HEIGHT_LARGE
                        : CELL_HEIGHT_SMALL
                }
                height={this.props.height}
                width={this.props.width}
            />
        );
    }
}

export default Cocktails;
