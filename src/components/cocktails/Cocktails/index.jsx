import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "react-virtualized";

import Cocktail from "../Cocktail";

import "./Cocktails.css";

const CELL_HEIGHT_SMALL = 320;
const CELL_HEIGHT_LARGE = 450;
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
        from: PropTypes.string,
        favorites: PropTypes.shape({
            ids: PropTypes.arrayOf(PropTypes.string).isRequired,
            values: PropTypes.object.isRequired,
        }).isRequired,
        toggleFavorite: PropTypes.func.isRequired,
        clearScroll: PropTypes.func.isRequired,
        scrollBarWidth: PropTypes.number.isRequired,
    };

    static defaultProps = {
        size: Cocktails.sizes.large,
        width: 0,
        height: 0,
    };

    gridRef = React.createRef();

    state = {};

    static getDerivedStateFromProps(props) {
        const columnsCount = Math.floor(
            (props.width - props.scrollBarWidth) / (CELL_WIDTH + 2 * MARGIN)
        );
        const rowHeight =
            props.size === Cocktails.sizes.large
                ? CELL_HEIGHT_LARGE + 2 * MARGIN
                : CELL_HEIGHT_SMALL + 2 * MARGIN;

        return {
            columnsCount: columnsCount,
            rowHeight,
        };
    }

    componentDidMount = () => {
        this.scrollToId(this.props.from);
    };

    componentDidUpdate(prevProps) {
        if (this.props.height !== prevProps.height && prevProps.from) {
            this.scrollToId(prevProps.from);
        }
    }

    scrollToId = id => {
        if (id) {
            const index =
                id && this.props.values
                    ? this.props.values.findIndex(item => item.idDrink === id)
                    : -1;
            const { columnsCount, rowHeight } = this.state;
            let position =
                index === -1 ? 0 : Math.floor(index / columnsCount) * rowHeight;

            const rowCount = Math.ceil(
                this.props.values.length / this.state.columnsCount
            );
            const totalHeight = rowCount * rowHeight;
            if (
                position > totalHeight - this.props.height &&
                totalHeight > rowHeight
            ) {
                position = totalHeight - this.props.height;
            }

            this.gridRef.current &&
                this.gridRef.current.scrollToPosition({
                    scrollTop: position,
                    scrollLeft: 0,
                });
            this.props.clearScroll();
        }
    };

    renderCell = ({
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
                    toggleFavorite={this.props.toggleFavorite}
                    favorite={this.props.favorites.ids.includes(
                        cocktail.idDrink
                    )}
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
                cellRenderer={this.renderCell}
                columnCount={this.state.columnsCount}
                rowCount={Math.ceil(
                    this.props.values.length / this.state.columnsCount
                )}
                columnWidth={
                    (this.props.width - this.props.scrollBarWidth) /
                    this.state.columnsCount
                }
                rowHeight={this.state.rowHeight}
                height={this.props.height}
                width={this.props.width}
                ref={this.gridRef}
                favorites={this.props.favorites}
            />
        );
    }
}

export default Cocktails;
