import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { createRandomTitle } from "../../../helpers/title";
import { addToFavorites } from "../../../actions/favorites";
import locations from "../../../constants/locations";
import CocktailDetails from "../../cocktail/CocktailDetails";
import RandomCard from "../RandomCard";
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
            <CocktailDetails
                getBackURL={this.getBackURL}
                skipArrows
                skipFavorites
            />
        );
    };

    renderRandom = () => {
        const value = this.props.favorites.values[this.props.favorites.ids[0]];
        return (
            <div className="random-content__board">
                <div className="random-content__cards">
                    <RandomCard>
                        <Cocktail
                            value={value}
                            to={this.linkCreator(value.idDrink)}
                            skipFavorites
                        />
                    </RandomCard>
                </div>
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
