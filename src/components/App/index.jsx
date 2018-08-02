import React, { Component } from "react";
import { connect } from "react-redux";

import LeftBar from "../LeftBar";
import Content from "../Content";

import "./App.css";

class App extends Component {
    renderBackground(menuItem) {
        const className = `app__background app__background_${menuItem}`;
        return <div className={className} />;
    }

    render() {
        return (
            <div className="app">
                {this.renderBackground(this.props.menuItem)}

                <div className="app__left">
                    <LeftBar />
                </div>
                <div className="app__right">
                    <Content />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    menuItem: state.menu.items[state.menu.selected].toLowerCase(),
}))(App);
