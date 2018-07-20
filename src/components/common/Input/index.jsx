import React, { Component } from "react";
import ActionButton from "../ActionButton";
import "./Input.css";

class Input extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.inputRef = React.createRef();
        this.state = { empty: true };
    }

    clearInput = () => {
        this.inputRef.current.value = "";
        this.inputRef.current.focus();
        this.setState({ empty: true });
    };

    onFocus = () => {
        this.containerRef.current.classList.add("input_focused");
    };

    onBlur = () => {
        this.containerRef.current.classList.remove("input_focused");
    };

    onChange = () => {
        if (this.state.empty && this.inputRef.current.value) {
            this.setState({ empty: false });
        } else if (!this.state.empty && !this.inputRef.current.value) {
            this.setState({ empty: true });
        }
    };

    renderRemoveButton() {
        if (this.state.empty) {
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
                    onChange={this.onChange}
                    className="input__field"
                    placeholder="fghjkl;jhbvb"
                    ref={this.inputRef}
                />
                {this.renderRemoveButton()}
            </span>
        );
    }
}

export default Input;
