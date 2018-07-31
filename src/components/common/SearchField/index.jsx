import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import ActionButton from "../ActionButton";
import "./SearchField.css";

class SearchField extends Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
    };

    state = {
        text: null,
    };

    startSearch = () => {
        this.props.onSearch(this.state.text);
    };

    valueChanged = value => {
        this.setState({ text: value });
        this.props.onSearch(value, false);
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
