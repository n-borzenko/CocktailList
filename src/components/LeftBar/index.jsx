import React, { Component } from "react";

import Logo from "../Logo";
import Menu from "../Menu";
import Settings from "../Settings";

import "./LeftBar.css";

class LeftBar extends Component {
    render() {
        return (
            <div className="left-bar">
                <div className="left-bar__item">
                    <Logo />
                </div>
                <div className="left-bar__item">
                    <Menu />
                </div>
                <div className="left-bar__item">
                    <Settings />
                </div>
            </div>
        );
    }
}

export default LeftBar;
