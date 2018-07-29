import React, { Component } from "react";
import LeftBar from "../LeftBar";
import Content from "../Content";
import MenuContext from "../context/MenuContext";
import SearchContext from "../context/SearchContext";
import "./App.css";

class App extends Component {
    renderBackground(menu) {
        const className = `app__background app__background_${menu.items[
            menu.selected
        ].toLowerCase()}`;
        return <div className={className} />;
    }

    render() {
        return (
            <div className="app">
                <MenuContext.Provider>
                    <SearchContext.Provider>
                        <MenuContext.Consumer>
                            {this.renderBackground}
                        </MenuContext.Consumer>

                        <div className="app__left">
                            <LeftBar />
                        </div>
                        <div className="app__right">
                            <Content />
                        </div>
                    </SearchContext.Provider>
                </MenuContext.Provider>
            </div>
        );
    }
}

export default App;
