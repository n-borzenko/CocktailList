import React, { Component } from "react";
import PropTypes from "prop-types";

import AnimatedIcon from "../../common/AnimatedIcon";
import Icon from "../../common/Icon";
import Title from "../../common/Title";
import { filterTypes, filterTitles } from "../../../constants/filters";

import "./FiltersHeader.css";

class FiltersHeader extends Component {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(filterTypes)).isRequired,
        onClick: PropTypes.func.isRequired,
        opened: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        type: filterTypes.category,
        opened: false,
    };

    render() {
        return (
            <button className="filters-header" onClick={this.props.onClick}>
                <Title>{filterTitles[this.props.type]}</Title>
                <span className="filters-header__button">
                    <span className="filters-header__icon">
                        <AnimatedIcon
                            animation={
                                this.props.opened
                                    ? AnimatedIcon.animation.up
                                    : AnimatedIcon.animation.down
                            }
                        >
                            <Icon type={Icon.types.arrowDown} />
                        </AnimatedIcon>
                    </span>
                </span>
            </button>
        );
    }
}

export default FiltersHeader;
