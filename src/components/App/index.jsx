import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../../store";
import LoadingBar from "../common/LoadingBar";
import LeftBar from "../LeftBar";
import SearchContent from "../SearchContent";
import FavoritesContent from "../FavoritesContent";
import RandomContent from "../RandomContent";
import IngridientsContent from "../IngridientsContent";
import NotFound from "../common/NotFound";
import locations from "../../constants/locations";

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
                            <Route
                                path={locations.search}
                                component={SearchContent}
                            />
                            <Route
                                path={locations.favorites}
                                component={FavoritesContent}
                            />
                            <Route
                                path={locations.random}
                                component={RandomContent}
                            />
                            <Route
                                path={locations.ingridients}
                                component={IngridientsContent}
                            />
                            <Route
                                path="/"
                                render={() => (
                                    <Redirect to={locations.search} />
                                )}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

export default App;
