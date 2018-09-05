import React, { Component } from "react";
import PropTypes from "prop-types";

import ActionButton from "../ActionButton";

import "./Input.css";

class Input extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };

    containerRef = React.createRef();
    inputRef = React.createRef();
    state = {
        value: this.props.value ? this.props.value : "",
    };

    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.previousPropValue) {
            return {
                previousStateValue: state.value,
                previousPropValue: props.value,
                value: props.value ? props.value : "",
            };
        } else if (state.value !== state.previousStateValue) {
            return { previousStateValue: state.value, value: state.value };
        }
        return null;
    }

    clearInput = () => {
        this.props.onChange("");
        this.inputRef.current.focus();
        this.setState({ value: "" });
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
        this.setState({ value: value });
    };

    renderRemoveButton() {
        if (!this.state.value) {
            return null;
        }
        return (
            <span className="input__remove">
                <ActionButton
                    type={ActionButton.types.remove}
                    style={ActionButton.styles.none}
                    onClick={this.clearInput}
                />
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
                    value={this.state.value}
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
