import React, { Component } from "react";
import { connect } from "react-redux";

import Logo from "../Logo";
import Menu from "../Menu";
import Settings from "../Settings";

import "./LeftBar.css";

class LeftBar extends Component {
    render() {
        console.log(this.props.location);
        return (
            <div className="left-bar">
                <div className="left-bar__item">
                    <Logo />
                </div>
                <div className="left-bar__item">
                    <Menu location={this.props.location} />
                </div>
                <div className="left-bar__item">
                    <Settings />
                </div>
            </div>
        );
    }
}

export default connect(state => ({ location: state.router.location }))(LeftBar);
