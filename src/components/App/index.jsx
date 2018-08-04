import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import LoadingBar from "../common/LoadingBar";
import LeftBar from "../LeftBar";
import SearchContent from "../SearchContent";
import FavoritesContent from "../FavoritesContent";
import RandomContent from "../RandomContent";
import IngridientsContent from "../IngridientsContent";

import "./App.css";

class App extends Component {
    renderBackground(menuItem) {
        const className = `app__background app__background_${menuItem}`;
        return <div className={className} />;
    }

    render() {
        return (
            <Router>
                <div className="app">
                    {this.renderBackground(this.props.menuItem)}

                    <div className="app__loading-bar">
                        <LoadingBar />
                    </div>
                    <div className="app__left">
                        <LeftBar />
                    </div>
                    <div className="app__right">
                        <Switch>
                            <Route exact path="/" component={SearchContent} />
                            <Route
                                path="/favorites"
                                component={FavoritesContent}
                            />
                            <Route path="/random" component={RandomContent} />
                            <Route
                                path="/ingridients"
                                component={IngridientsContent}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect(state => ({
    menuItem: state.menu.items[state.menu.selected].toLowerCase(),
}))(App);
