import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "react-virtualized";

import Cocktail from "../Cocktail";

import "./Cocktails.css";

const CELL_HEIGHT_SMALL = 320;
const CELL_HEIGHT_LARGE = 442;
const CELL_WIDTH = 256;
const MARGIN = 8;

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

    state = {};

    static getDerivedStateFromProps(props) {
        return {
            columnsCount: Math.floor(props.width / (CELL_WIDTH + 2 * MARGIN)),
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
                <div className="cocktails__stub" />
            ) : (
                <Cocktail
                    value={cocktail}
                    to={this.props.linkCreator(cocktail.idDrink)}
                />
            );
        return (
            <div key={key} style={style} className="cocktails__cell">
                <div
                    className={`cocktails__wrapper cocktails__wrapper_${
                        this.props.size
                    }`}
                >
                    {content}
                </div>
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
                className="cocktails"
                cellRenderer={this.cellRenderer}
                columnCount={this.state.columnsCount}
                rowCount={Math.ceil(
                    this.props.values.length / this.state.columnsCount
                )}
                columnWidth={this.props.width / this.state.columnsCount}
                rowHeight={
                    this.props.size === Cocktails.sizes.large
                        ? CELL_HEIGHT_LARGE + 2 * MARGIN
                        : CELL_HEIGHT_SMALL + 2 * MARGIN
                }
                height={this.props.height}
                width={this.props.width}
            />
        );
    }
}

export default Cocktails;
