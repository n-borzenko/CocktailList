import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import MainHeader from "../common/MainHeader";
import Menu from "../Menu";
import Settings from "../Settings";
import Popup from "../common/Popup";
import PopupContent from "../common/PopupContent";
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
                name: menuItems.ingridients,
                location: locations.ingridients,
            },
        ],
        showMenuPopup: false,
    };

    checkWidth = () => {
        if (this.state.showMenuPopup && window.innerWidth > 400) {
            this.closePopup();
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.checkWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkWidth);
    }

    renderHeader = title => {
        return (
            <MainHeader
                type={MainHeader.types.logo}
                compactTitle={title}
                onClick={() => this.setState({ showMenuPopup: true })}
            />
        );
    };

    closePopup = () => {
        this.setState({
            showMenuPopup: false,
        });
    };

    renderPopup = () => {
        return !this.state.showMenuPopup ? null : (
            <Popup>
                <PopupContent onClick={this.closePopup}>
                    <Menu onClick={this.closePopup} />
                </PopupContent>
            </Popup>
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
                {/* <div className="settings-bar__parameters"> */}
                <Settings />
                {/* </div> */}
            </div>
        );
    }
}

export default SettingsBar;
