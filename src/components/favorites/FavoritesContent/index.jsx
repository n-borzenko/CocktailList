import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktail/CocktailDetails";
import locations from "../../../constants/locations";
import { createFavoritesTitle } from "../../../helpers/title";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../../actions/favorites";

import "./FavoritesContent.css";

const PADDING_HEIGHT = 24;

class FavoritesContent extends Component {
    renderCocktailDetails = () => {
        return (
            <CocktailDetails
                getBackURL={this.getBackURL}
                results={this.state.currentResults}
                locationCreator={this.locationCreator}
            />
        );
    };

    state = {
        prevLocation: null,
        prevFavorites: null,
        values: [],
        currentResults: [],
    };

    componentDidMount() {
        this.createTitle();
    }

    componentDidUpdate() {
        this.createTitle();
    }

    static getDerivedStateFromProps(props, state) {
        const appendResults =
            (!state.prevLocation && locations.favoritesCocktail) ||
            (state.prevLocation.pathname === locations.favorites &&
                props.location.pathname.startsWith(
                    locations.favoritesCocktail
                ));

        let newState = {};
        if (!state.prevLocation || state.prevLocation !== props.location) {
            newState.prevLocation = props.location;
        }

        if (
            !state.prevFavorites ||
            state.prevFavorites.favorites !== props.favorites
        ) {
            const { ids, values } = props.favorites;
            const data = ids.map(item => values[item]).filter(item => item);
            newState = {
                ...newState,
                prevFavorites: props.favorites,
                values: data,
            };
            if (appendResults) {
                newState.currentResults = newState.values;
            }
        } else {
            if (appendResults) {
                newState.currentResults = state.values;
            }
        }
        return Object.keys(newState).length ? newState : null;
    }

    createTitle = () => {
        if (this.props.location.pathname !== locations.favoritesCocktail) {
            createFavoritesTitle();
        }
    };

    getBackURL = () => {
        return { pathname: locations.favorites, search: "" };
    };

    locationCreator = id => {
        return {
            pathname: `${locations.favoritesCocktail}/${id}`,
            search: "",
        };
    };

    linkCreator = id => {
        return `${locations.favoritesCocktail}/${id}`;
    };

    toggleFavorite = (favorite, id, value = null) => {
        if (favorite) {
            this.props.addToFavorites(id, value);
        } else {
            this.props.removeFromFavorites(id);
        }
    };

    renderCocktails = () => {
        return (
            <Cocktails
                width={this.props.width}
                height={this.props.height - PADDING_HEIGHT * 2}
                values={this.state.values}
                size={Cocktails.sizes.large}
                linkCreator={id => this.linkCreator(id)}
                from={this.props.cocktail ? this.props.cocktail.idDrink : null}
                favorites={this.props.favorites}
                toggleFavorite={this.toggleFavorite}
            />
        );
    };

    render() {
        return (
            <div className="favorites-content">
                <Switch location={this.props.location}>
                    <Route
                        path={locations.favoritesCocktail}
                        render={this.renderCocktailDetails}
                    />
                    <Route
                        path={locations.favorites}
                        render={this.renderCocktails}
                    />
                </Switch>
            </div>
        );
    }
}

export default connect(
    state => ({
        location: state.router.location,
        cocktail: state.cocktail.value,
        favorites: state.favorites,
    }),
    { addToFavorites, removeFromFavorites }
)(FavoritesContent);
