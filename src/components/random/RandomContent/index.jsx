import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { createRandomTitle } from "../../../helpers/title";
import { addToFavorites } from "../../../actions/favorites";
import locations from "../../../constants/locations";
import CocktailDetails from "../../cocktail/CocktailDetails";
import RandomCards from "../RandomCards";
import Cocktail from "../../cocktails/Cocktail";

import "./RandomContent.css";

class RandomContent extends Component {
    componentDidMount() {
        createRandomTitle();
    }

    linkCreator = id => {
        return `${locations.randomCocktail}/${id}`;
    };

    getBackURL = () => {
        return { pathname: locations.random, search: "" };
    };

    renderCocktailDetails = () => {
        return (
            <div className="random-content__details">
                <CocktailDetails
                    getBackURL={this.getBackURL}
                    skipArrows
                    skipFavorites
                />
            </div>
        );
    };

    renderRandom = () => {
        const value = this.props.favorites.values[this.props.favorites.ids[0]];
        return (
            <div className="random-content__board">
                <RandomCards>
                    <Cocktail
                        value={value}
                        to={this.linkCreator(value.idDrink)}
                        skipFavorites
                    />
                </RandomCards>
            </div>
        );
    };

    render() {
        return (
            <div className="random-content">
                <Switch location={this.props.location}>
                    <Route
                        path={locations.randomCocktail}
                        render={this.renderCocktailDetails}
                    />
                    <Route path={locations.random} render={this.renderRandom} />
                </Switch>
            </div>
        );
    }
}

export default connect(
    state => ({
        favorites: state.favorites,
        location: state.router.location,
    }),
    { addToFavorites }
)(RandomContent);
