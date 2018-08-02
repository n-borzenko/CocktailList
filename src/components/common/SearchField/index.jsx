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
        useDelay: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        useDelay: false,
    };

    timer = null;

    state = {
        text: null,
    };

    startSearch = () => {
        clearTimeout(this.timer);
        this.props.onSearch(this.state.text);
    };

    valueChanged = value => {
        this.setState({ text: value });
        if (this.props.useDelay) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.props.onSearch(this.state.text);
            }, SEARCH_DELAY);
        } else {
            this.props.onSearch(value);
        }
    };

    render() {
        return (
            <div className="search-field">
                <div className="search-field__input">
                    <Input
                        onChange={this.valueChanged}
                        placeholder={this.props.placeholder}
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
