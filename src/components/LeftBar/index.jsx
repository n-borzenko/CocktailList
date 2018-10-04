import React, { Component } from "react";

import MainHeader from "../MainHeader";
import Menu from "../Menu";
import Settings from "../Settings";

import "./LeftBar.css";

class LeftBar extends Component {
    render() {
        return (
            <div className="left-bar">
                <div className="left-bar__item">
                    <MainHeader
                        type={MainHeader.types.popup}
                        title="Search"
                        onClick={() => console.log("clicked")}
                    />
                </div>
                {/* <div className="left-bar__item">
                    <Menu location={this.props.location} />
                </div>
                <div className="left-bar__item">
                    <Settings />
                </div> */}
            </div>
        );
    }
}

export default LeftBar;
