import React, { Component } from "react";
import MenuContext from "../context/MenuContext";
import Mode from "../Mode";
import Filters from "../Filters";
import "./Settings.css";

class Settings extends Component {
    renderSearchSettings() {
        return (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                {/* <div className="settings__item">
                    <Filters />
                </div> */}
            </div>
        );
    }

    renderFavoritesSettings() {
        return (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                {/* <div className="settings__item">
                    <Filters />
                </div> */}
            </div>
        );
    }

    renderIngridientsSettings() {
        return (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
            </div>
        );
    }

    render() {
        return (
            <MenuContext.Consumer>
                {menu => {
                    switch (menu.selected) {
                        case 0:
                            return this.renderSearchSettings();
                        case 1:
                            return this.renderFavoritesSettings();
                        case 3:
                            return this.renderIngridientsSettings();
                        default:
                            return null;
                    }
                }}
            </MenuContext.Consumer>
        );
    }
}

export default Settings;
