import React, { Component } from "react";
import MenuContext from "../context/MenuContext";
import Mode from "../Mode";
import Filters from "../Filters";
import "./Settings.css";

class Settings extends Component {
    renders = {
        search: () => (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                {/* <div className="settings__item">
                    <Filters />
                </div> */}
            </div>
        ),
        favorites: () => (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                {/* <div className="settings__item">
                    <Filters />
                </div> */}
            </div>
        ),
        random: () => null,
        ingridients: () => (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
            </div>
        ),
    };

    render() {
        return (
            <MenuContext.Consumer>
                {menu =>
                    this.renders[menu.items[menu.selected].toLowerCase()]()
                }
            </MenuContext.Consumer>
        );
    }
}

export default Settings;
