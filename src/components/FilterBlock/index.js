import React, { Component } from "react";
import PropTypes from "prop-types";

import ActionButton from "../common/ActionButton";
import Title from "../common/Title";
import { filterTypes, filterTitles } from "../../constants/filters";

import "./FilterBlock.css";

export class FilterBlock extends Component {
    static types = { ...filterTypes };

    static propTypes = {
        type: PropTypes.oneOf(Object.values(FilterBlock.types)).isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        opened: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        type: FilterBlock.types.category,
        values: [],
        opened: false,
    };

    render() {
        return (
            <div className="filter-block">
                <Title>{filterTitles[this.props.type]}</Title>
                <div className="filters__button">
                    <ActionButton
                        type={ActionButton.types.arrowDown}
                        style={ActionButton.styles.dark}
                        onClick={() => console.log("open")}
                    />
                </div>
                <div className="filter-block__values">
                    {this.props.values.map(item => (
                        <span key={item}>
                            {item}
                            <br />
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

export default FilterBlock;
