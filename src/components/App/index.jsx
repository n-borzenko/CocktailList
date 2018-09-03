import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";

import { history } from "../../store";
import LoadingBar from "../common/LoadingBar";
import LeftBar from "../LeftBar";
import SearchContent from "../SearchContent";
import FavoritesContent from "../FavoritesContent";
import RandomContent from "../RandomContent";
import IngridientsContent from "../IngridientsContent";
import NotFound from "../common/NotFound";

import "./App.css";

class App extends Component {
    renderBackground(menuItem) {
        const className = `app__background app__background_${menuItem}`;
        return <div className={className} />;
    }

    render() {
        return (
            <ConnectedRouter history={history}>
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
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

export default connect(state => ({
    menuItem: state.menu.items[state.menu.selected].toLowerCase(),
}))(App);
