import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";

import { history } from "../../store";
import LoadingBar from "../common/LoadingBar";
import BackgroundImage from "../common/BackgroundImage";
import Notifications from "../notifications/Notifications";
import SettingsBar from "../SettingsBar";
import SearchContent from "../search/SearchContent";
import FavoritesContent from "../favorites/FavoritesContent";
import RandomContent from "../random/RandomContent";
import IngredientsContent from "../ingredients/IngredientsContent";
import AboutContent from "../about/AboutContent";
import NotFound from "../common/NotFound";
import locations from "../../constants/locations";
import { POPUP_ID } from "../../constants/views";
import { actualizeFavorites } from "../../actions/favorites";

import "./App.css";

class App extends Component {
    containerRef = React.createRef();
    state = {
        width: 0,
        height: 0,
    };

    componentDidMount() {
        this.resizeHandler();
        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("storage", this.actualizeFavorites);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
        window.removeEventListener("storage", this.actualizeFavorites);
    }

    resizeHandler = () => {
        this.setState({
            width: this.containerRef.current.clientWidth,
            height: this.containerRef.current.clientHeight,
        });
    };

    actualizeFavorites = event => {
        if (event.storageArea === window.localStorage) {
            this.props.actualizeFavorites(event.key);
        }
    };

    renderSearchContent = () => (
        <SearchContent width={this.state.width} height={this.state.height} />
    );

    renderFavoritesContent = () => (
        <FavoritesContent width={this.state.width} height={this.state.height} />
    );

    renderIngredientsContent = () => (
        <IngredientsContent
            width={this.state.width}
            height={this.state.height}
        />
    );

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
                                render={this.renderSearchContent}
                            />
                            <Route
                                path={locations.favorites}
                                render={this.renderFavoritesContent}
                            />
                            <Route
                                path={locations.random}
                                component={RandomContent}
                            />
                            <Route
                                path={locations.ingredients}
                                render={this.renderIngredientsContent}
                            />
                            <Route
                                path={locations.about}
                                component={AboutContent}
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

                    <div className="app__notifications">
                        <Notifications />
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

export default connect(
    null,
    { actualizeFavorites }
)(App);
