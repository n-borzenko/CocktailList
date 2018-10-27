import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import MainHeader from "../common/MainHeader";
import Menu from "../Menu";
import Parameters from "../Parameters";
import PopupContent from "../common/popup/PopupContent";
import PopupPresenter from "../common/popup/PopupPresenter";
import menuItems from "../../constants/menu";
import locations from "../../constants/locations";

import "./SettingsBar.css";

class SettingsBar extends Component {
    state = {
        items: [
            {
                name: menuItems.search,
                location: locations.search,
            },
            {
                name: menuItems.favorites,
                location: locations.favorites,
            },
            {
                name: menuItems.random,
                location: locations.random,
            },
            {
                name: menuItems.ingredients,
                location: locations.ingredients,
            },
        ],
        showPopup: false,
    };

    renderHeader = title => {
        return (
            <MainHeader
                type={MainHeader.types.logo}
                compactTitle={title}
                onClick={() => this.setState({ showPopup: true })}
            />
        );
    };

    closePopup = () => {
        this.setState({ showPopup: false });
    };

    renderPopup = () => {
        return (
            <PopupPresenter
                showPopup={this.state.showPopup}
                closePopup={this.closePopup}
            >
                <PopupContent onClick={this.closePopup}>
                    <Menu onClick={this.closePopup} />
                </PopupContent>
            </PopupPresenter>
        );
    };

    render() {
        return (
            <div className="settings-bar">
                <div className="settings-bar__header">
                    <Switch>
                        {this.state.items.map(item => (
                            <Route
                                path={item.location}
                                render={() => this.renderHeader(item.name)}
                                key={item.name}
                            />
                        ))}
                    </Switch>
                </div>

                {this.renderPopup()}

                <div className="settings-bar__menu">
                    <Menu location={this.props.location} />
                </div>
                <Parameters />
            </div>
        );
    }
}

export default SettingsBar;
