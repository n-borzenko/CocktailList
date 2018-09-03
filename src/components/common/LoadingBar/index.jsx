import React, { Component } from "react";
import { connect } from "react-redux";

import "./LoadingBar.css";

class LoadingBar extends Component {
    render() {
        if (!this.props.active) {
            return null;
        }
        return (
            <div className="loading-bar">
                <div className="loading-bar__item" />
            </div>
        );
    }
}

export default connect(state => ({
    active: state.loading.active,
}))(LoadingBar);
