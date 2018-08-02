import React, { Component } from "react";
import { connect } from "react-redux";
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
        return this.renders[this.props.menuItem]();
    }
}

export default connect(state => ({
    menuItem: state.menu.items[state.menu.selected].toLowerCase(),
}))(Settings);
