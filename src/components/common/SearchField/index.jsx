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

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    }

    startSearch = () => {
        this.props.onSearch(this.state.value, true);
    };

    valueCleared = value => {
        this.setState({ value });
        this.props.onSearch(value, true);
    };

    valueChanged = value => {
        this.setState({ value });
        this.props.onSearch(value);
    };

    render() {
        return (
            <div className="search-field">
                <div className="search-field__input">
                    <Input
                        onClear={this.valueCleared}
                        onChange={this.valueChanged}
                        placeholder={this.props.placeholder}
                        value={this.state.value || ""}
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
