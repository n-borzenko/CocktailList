import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../../common/Icon";
import { filterTypes } from "../../../constants/filters";

import "./Filter.css";

class Filter extends Component {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(filterTypes)).isRequired,
        children: PropTypes.node.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        selected: false,
    };

    renderIcon() {
        if (!this.props.selected) {
            return null;
        }
        return (
            <span className="filter__icon">
                <Icon type={Icon.types.checked} color={Icon.colors.light} />
            </span>
        );
    }

    render() {
        const className = classNames("filter", {
            [`filter_${this.props.type}`]: this.props.type !== undefined,
        });
        return (
            <button
                className={className}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
            >
                {this.props.children}
                {this.renderIcon()}
            </button>
        );
    }
}

export default Filter;
