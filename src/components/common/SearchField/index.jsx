import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import ActionButton from "../ActionButton";
import Icon from "../Icon";

import "./SearchField.css";

class SearchField extends Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };

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
                        value={this.props.value || ""}
                    />
                </div>
                <div className="search-field__action">
                    <ActionButton onClick={this.startSearch}>
                        <Icon type={Icon.types.search} />
                    </ActionButton>
                </div>
            </div>
        );
    }
}

export default SearchField;
