import React, { Component } from "react";
import { connect } from "react-redux";

import Mode from "../Mode";
import Filters from "../Filters";
import locations from "../../constants/locations";

import "./Settings.css";

class Settings extends Component {
    renders = {
        [locations.search]: () => (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                {/* <div className="settings__item">
                    <Filters />
                </div> */}
            </div>
        ),
        [locations.favorites]: () => (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                {/* <div className="settings__item">
                    <Filters />
                </div> */}
            </div>
        ),
        [locations.random]: () => null,
        [locations.ingridients]: () => (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
            </div>
        ),
    };

    render() {
        if (this.renders.hasOwnProperty(this.props.location)) {
            return this.renders[this.props.location]();
        } else {
            return null;
        }
    }
}

export default connect(state => ({
    location: state.router.location.pathname,
}))(Settings);
