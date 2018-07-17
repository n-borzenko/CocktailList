import React, { Component } from "react";
import LeftBar from "../LeftBar";
import Content from "../Content";
import MenuContext from "../context/MenuContext";
import classNames from "classnames";
import "./App.css";

class App extends Component {
    renderBackground(menu) {
        let className = classNames(
            "app__background",
            `app__background_${menu.items[menu.selected]}`.toLowerCase()
        );
        return <div className={className} />;
    }

    render() {
        return (
            <div className="app">
                <MenuContext.Provider>
                    <MenuContext.Consumer>
                        {this.renderBackground}
                    </MenuContext.Consumer>

                    <div className="app__left">
                        <LeftBar />
                    </div>
                    <div className="app__right">
                        <Content />
                    </div>
                </MenuContext.Provider>
            </div>
        );
    }
}

export default App;
