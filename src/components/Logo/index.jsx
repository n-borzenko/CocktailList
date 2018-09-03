import React, { Component } from "react";

import Header from "../common/Header";
import Icon from "../common/Icon";

import "./Logo.css";

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <div className="logo__title">
                    <Header>CocktailList</Header>
                </div>
                <div className="logo__icon">
                    <Icon type={Icon.types.logo} />
                </div>
            </div>
        );
    }
}

export default Logo;
