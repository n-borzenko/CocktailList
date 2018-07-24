import React, { Component } from "react";
import Mode from "../Mode";
import Filters from "../Filters";
import "./Settings.css";

class Settings extends Component {
    render() {
        return (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                <div className="settings__item">
                    <Filters />
                </div>
            </div>
        );
    }
}

export default Settings;
