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
import IngredientsContent from "../ingredients/IngredientsContent";
import NotFound from "../common/NotFound";
import locations from "../../constants/locations";
import { POPUP_ID } from "../../constants/views";

import "./App.css";

class App extends Component {
    containerRef = React.createRef();
    state = {
        width: 0,
        height: 0,
    };

    resizeHandler = () => {
        this.containerRef.current.classList.add("app__content_hidden");
        this.setState({
            width: this.containerRef.current.clientWidth,
            height: this.containerRef.current.clientHeight,
        });
        this.containerRef.current.classList.remove("app__content_hidden");
    };

    componentDidMount() {
        this.resizeHandler();
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    }

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
                    <div className="app__content" ref={this.containerRef}>
                        <Switch>
                            <Route
                                path={locations.search}
                                render={() => (
                                    <SearchContent
                                        width={this.state.width}
                                        height={this.state.height}
                                    />
                                )}
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
                                path={locations.ingredients}
                                component={IngredientsContent}
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
