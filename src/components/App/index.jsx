import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../../store";
import LoadingBar from "../common/LoadingBar";
import BackgroundImage from "../common/BackgroundImage";
import SettingsBar from "../SettingsBar";
import SearchContent from "../search/SearchContent";
import FavoritesContent from "../favorites/FavoritesContent";
import RandomContent from "../random/RandomContent";
import IngridientsContent from "../ingridients/IngridientsContent";
import NotFound from "../common/NotFound";
import locations from "../../constants/locations";
import { POPUP_ID } from "../../constants/views";

import "./App.css";

class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <div className="app">
                    <BackgroundImage />

                    <div className="app__loading-bar">
                        <LoadingBar />
                    </div>

                    <div className="app__settings">
                        <SettingsBar />
                    </div>
                    <div className="app__content">
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

                    <div className="app__popup" id={POPUP_ID} />
                </div>
            </ConnectedRouter>
        );
    }
}

export default App;
