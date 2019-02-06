import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../../common/Button";
import Icon from "../../common/Icon";
import ActionButton from "../../common/ActionButton";

import "./FilterSelector.css";

class FilterSelector extends Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        filter: PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        }),
    };

    renderButton = () => {
        return (
            <Button stretched onClick={this.props.onSelect}>
                Select filter
            </Button>
        );
    };

    renderFilter = () => {
        const className = `filter-selector__title filter-selector__title_${
            this.props.filter.type
        }`;
        return (
            <div className="filter-selector">
                <div className={className}>
                    <span className="filter-selector__text">
                        {this.props.filter.name}
                    </span>
                </div>
                <div className="filter-selector__icon">
                    <ActionButton onClick={this.props.onSelect}>
                        <Icon type={Icon.types.edit} />
                    </ActionButton>
                </div>
            </div>
        );
    };

    render() {
        return this.props.filter ? this.renderFilter() : this.renderButton();
    }
}

export default FilterSelector;
