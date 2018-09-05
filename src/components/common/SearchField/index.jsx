import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import ActionButton from "../ActionButton";

import "./SearchField.css";

const SEARCH_DELAY = 300;

class SearchField extends Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };

    timer = null;

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
        clearTimeout(this.timer);
        this.props.onSearch(this.state.text);
    };

    valueChanged = value => {
        this.setState({ text: value });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.onSearch(this.state.text);
        }, SEARCH_DELAY);
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
