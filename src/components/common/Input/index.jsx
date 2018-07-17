import React, { Component } from "react";
import ActionButton from "../ActionButton";
import classNames from "classnames";
import "./Input.css";

class Input extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = { focused: false };
    }

    clearInput = () => {
        this.inputRef.current.value = "";
        this.inputRef.current.focus();
    };

    onFocus = () => {
        this.setState({ focused: true });
    };

    onBlur = () => {
        this.setState({ focused: false });
    };

    render() {
        const className = classNames("input", {
            input_focused: this.state.focused,
        });
        return (
            <span className={className}>
                <input
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    className="input__field"
                    placeholder="fghjkl;jhbvb"
                    ref={this.inputRef}
                />
                <span className="input__remove">
                    <ActionButton
                        type={ActionButton.types.remove}
                        style={ActionButton.styles.none}
                        onClick={this.clearInput}
                    />
                </span>
            </span>
        );
    }
}

export default Input;
