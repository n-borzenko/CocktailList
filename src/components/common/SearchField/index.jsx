import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import ActionButton from "../ActionButton";

import "./SearchField.css";

class SearchField extends Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };

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

    startSearch = () => {
        this.props.onSearch(this.state.text);
    };

    valueChanged = value => {
        this.setState({ text: value });
        this.props.onSearch(value);
    };

    render() {
        return (
            <div className="search-field">
                <div className="search-field__input">
                    <Input
                        onChange={this.valueChanged}
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                    />
                </div>
                <div className="search-field__action">
                    <ActionButton
                        type={ActionButton.types.search}
                        onClick={this.startSearch}
                    />
                </div>
            </div>
        );
    }
}

export default SearchField;
