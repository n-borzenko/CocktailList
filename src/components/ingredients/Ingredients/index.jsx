import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "react-virtualized";

import Ingredient from "../Ingredient";

import "./Ingredients.css";

const CELL_HEIGHT = 320;
const CELL_WIDTH = 256;
const MARGIN = 8;

class Ingredients extends Component {
    static propTypes = {
        values: PropTypes.array.isRequired,
        linkCreator: PropTypes.func.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        from: PropTypes.string,
    };

    static defaultProps = {
        width: 0,
        height: 0,
    };

    gridRef = React.createRef();

    state = {};

    static getDerivedStateFromProps(props) {
        const columnsCount = Math.floor(
            props.width / (CELL_WIDTH + 2 * MARGIN)
        );
        const index =
            props.from && props.values
                ? props.values.findIndex(item => item === props.from)
                : -1;
        const rowHeight = CELL_HEIGHT + 2 * MARGIN;
        const position =
            index === -1 ? 0 : Math.floor(index / columnsCount) * rowHeight;
        return {
            columnsCount: columnsCount,
            scrollTo: { scrollTop: position, scrollLeft: 0 },
            rowHeight,
        };
    }

    componentDidMount = () => {
        this.gridRef.current &&
            this.gridRef.current.scrollToPosition(this.state.scrollTo);
    };

    componentDidUpdate = () => {
        this.gridRef.current &&
            this.gridRef.current.scrollToPosition(this.state.scrollTo);
    };

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
        const ingredient = this.props.values[index];
        const content =
            isScrolling && !isVisible ? (
                <div className="ingredients__stub" />
            ) : (
                <Ingredient
                    value={ingredient}
                    to={this.props.linkCreator(ingredient)}
                />
            );
        return (
            <div key={key} style={style} className="ingredients__cell">
                <div className="ingredients__wrapper">{content}</div>
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
                className="ingredients"
                cellRenderer={this.cellRenderer}
                columnCount={this.state.columnsCount}
                rowCount={Math.ceil(
                    this.props.values.length / this.state.columnsCount
                )}
                columnWidth={this.props.width / this.state.columnsCount}
                rowHeight={this.state.rowHeight}
                height={this.props.height}
                width={this.props.width}
                ref={this.gridRef}
            />
        );
    }
}

export default Ingredients;