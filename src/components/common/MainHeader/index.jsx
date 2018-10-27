import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Icon from "../Icon";
import ActionButton from "../ActionButton";

import "./MainHeader.css";

const TITLE = "CocktailList";

class MainHeader extends Component {
    static types = {
        logo: "logo",
        popup: "popup",
    };

    static propTypes = {
        onClick: PropTypes.func,
        title: PropTypes.string.isRequired,
        compactTitle: PropTypes.string.isRequired,
        type: PropTypes.oneOf(Object.values(MainHeader.types)).isRequired,
    };

    static defaultProps = {
        title: TITLE,
        compactTitle: TITLE,
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
            <div className="main-header-wrapper">
                <div className="main-header main-header_full">
                    <div className="main-header__title">
                        <Header>{this.props.title}</Header>
                    </div>
                    <div className="main-header__icon-wrapper">
                        <div className="main-header__icon">
                            <Icon
                                type={Icon.types.logo}
                                color={Icon.colors.light}
                            />
                        </div>
                    </div>
                </div>
                <div className="main-header main-header_compact">
                    <div className="main-header__title">
                        <Header>{this.props.compactTitle}</Header>
                    </div>
                    <div className="main-header__button">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainHeader;
