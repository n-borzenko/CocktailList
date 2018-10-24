import React, { Component } from "react";
import PropTypes from "prop-types";

import ActionButton from "../ActionButton";
import Icon from "../Icon";

import "./Input.css";

class Input extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };

    containerRef = React.createRef();
    inputRef = React.createRef();

    clearInput = () => {
        this.props.onChange("");
        this.inputRef.current.focus();
    };

    onFocus = () => {
        this.containerRef.current.classList.add("input_focused");
    };

    onBlur = () => {
        this.containerRef.current.classList.remove("input_focused");
    };

    onChange = e => {
        let value = e.target.value;
        this.props.onChange(value);
    };

    renderRemoveButton() {
        if (!this.props.value) {
            return null;
        }
        return (
            <span className="input__remove">
                <ActionButton
                    style={ActionButton.styles.none}
                    onClick={this.clearInput}
                    tabindex={-1}
                >
                    <Icon type={Icon.types.remove} />
                </ActionButton>
            </span>
        );
    }

    render() {
        return (
            <span
                className="input"
                ref={this.containerRef}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            >
                <input
                    value={this.props.value || ""}
                    onChange={this.onChange}
                    className="input__field"
                    placeholder={this.props.placeholder}
                    ref={this.inputRef}
                />
                {this.renderRemoveButton()}
            </span>
        );
    }
}

export default Input;
