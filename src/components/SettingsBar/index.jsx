import React, { Component } from "react";

import MainHeader from "../MainHeader";
import Menu from "../Menu";
import Settings from "../Settings";
import Popup from "../common/Popup";

import "./SettingsBar.css";

class SettingsBar extends Component {
    render() {
        return (
            <div className="settings-bar">
                <div className="settings-bar__item">
                    <MainHeader
                        type={MainHeader.types.logo}
                        title="Search"
                        onClick={() => console.log("clicked")}
                    />
                </div>
                <Popup>wertyukilo;</Popup>

                <div className="settings-bar__item">
                    <Menu location={this.props.location} />
                </div>
                <div className="settings-bar__item">
                    <Settings />
                </div>
            </div>
        );
    }
}

export default SettingsBar;
