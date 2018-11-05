import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import CocktailDetails from "../../cocktail/CocktailDetails";
import locations from "../../../constants/locations";
import { createFavoritesTitle } from "../../../helpers/title";

import "./FavoritesContent.css";

class FavoritesContent extends Component {
    renderCocktailDetails = () => {
        return <CocktailDetails />;
    };

    render() {
        return (
            <div className="favorites-content">
                <Switch location={this.props.location}>
                    <Route
                        path={locations.favoritesCocktail}
                        render={this.renderCocktailDetails}
                    />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        createFavoritesTitle();
    }
}

export default connect(state => ({
    location: state.router.location,
}))(FavoritesContent);
