import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "../common/Header";
import Icon from "../common/Icon";
import ActionButton from "../common/ActionButton";

import "./MainHeader.css";

class MainHeader extends Component {
    static types = {
        logo: "logo",
        popup: "popup",
    };

    static propTypes = {
        onClick: PropTypes.func,
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf(Object.values(MainHeader.types)).isRequired,
    };

    static defaultProps = {
        title: "CocktailList",
        type: MainHeader.types.logo,
    };

    renderButton = () => {
        return (
            <ActionButton
                style={ActionButton.styles.light}
                size={ActionButton.sizes.default}
                onClick={this.props.onClick}
            >
                <Icon
                    type={
                        this.props.type === MainHeader.types.popup
                            ? Icon.types.remove
                            : Icon.types.logo
                    }
                />
            </ActionButton>
        );
    };

    render() {
        return (
            <div className="main-header">
                <div className="main-header__title">
                    <Header>{this.props.title}</Header>
                </div>
                <div className="main-header__button">{this.renderButton()}</div>
                <div className="main-header__icon-wrapper">
                    <div className="main-header__icon">
                        <Icon
                            type={Icon.types.logo}
                            color={Icon.colors.light}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainHeader;
