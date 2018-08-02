import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./ButtonGroup.css";

class ButtonGroup extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        selected: PropTypes.number,
        disabled: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
        };
    }

    selectItem = index => {
        this.setState({ selected: index });
        if (this.props.onSelect) {
            this.props.onSelect(index);
        }
    };

    renderValues = () => {
        if (!this.props.values || this.props.values.length === 0) {
            return null;
        }
        return this.props.values.map((item, index) => {
            const className = classNames("button-group__item", {
                "button-group__item_selected": this.state.selected === index,
            });
            return (
                <button
                    className={className}
                    key={item}
                    disabled={this.props.disabled}
                    style={{ left: `-${index}px` }}
                    onClick={e => this.selectItem(index, e)}
                >
                    {item}
                </button>
            );
        });
    };

    render() {
        var style =
            this.props.values && this.props.values.length > 0
                ? { left: `${this.props.values.length / 2}px` }
                : null;
        return (
            <div
                className="button-group"
                disabled={this.props.disabled}
                style={style}
            >
                {this.renderValues()}
            </div>
        );
    }
}

export default ButtonGroup;
