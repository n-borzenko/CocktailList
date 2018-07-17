import React, { Component } from "react";
import Input from "../Input";
import ActionButton from "../ActionButton";
import "./SearchField.css";

class SearchField extends Component {
    startSearch = () => {
        console.log("start search");
    };
    render() {
        return (
            <div className="search-field">
                <div className="search-field__input">
                    <Input />
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
