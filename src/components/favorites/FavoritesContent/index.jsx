import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktail/CocktailDetails";
import Button from "../../common/Button";
import locations from "../../../constants/locations";
import { createFavoritesTitle } from "../../../helpers/title";
import {
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    loadMissingValues,
    updateOutdatedValues,
} from "../../../actions/favorites";

import "./FavoritesContent.css";

const PADDING_HEIGHT = 16;
const BUTTONS_HEIGHT = 48;

class FavoritesContent extends Component {
    state = {
        values: [],
        currentResults: [],
    };

    componentDidMount() {
        this.createTitle();
        this.props.loadMissingValues();

        const { ids, values } = this.props.favorites;
        const data = ids.map(item => values[item]).filter(item => item);
        this.setState({
            values: data,
            currentResults: data,
        });
    }

    componentDidUpdate(prevProps) {
        this.createTitle();

        // create array of cocktails
        if (this.props.favorites !== prevProps.favorites) {
            const { ids, values } = this.props.favorites;
            const data = ids.map(item => values[item]).filter(item => item);
            this.setState({
                values: data,
            });

            // change list for cocktail details, if it is not visible
            if (
                !this.props.location.pathname.startsWith(
                    locations.favoritesCocktail
                )
            ) {
                this.setState({
                    currentResults: data,
                });
            }
        } else if (
            prevProps.location.pathname.startsWith(
                locations.favoritesCocktail
            ) &&
            this.props.location.pathname === locations.favorites
        ) {
            // update list for cocktail details, if it was just closed
            this.setState(state => ({
                currentResults: state.values,
            }));
        }
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

    renderCocktailDetails = () => {
        return (
            <CocktailDetails
                getBackURL={this.getBackURL}
                results={this.state.currentResults}
                locationCreator={this.locationCreator}
            />
        );
    };

    renderCocktails = () => {
        return (
            <Fragment>
                <div className="favorites-content__buttons">
                    <div className="favorites-content__button">
                        <Button onClick={this.props.updateOutdatedValues}>
                            Check for updates
                        </Button>
                    </div>
                    <div className="favorites-content__button">
                        <Button onClick={this.props.clearFavorites}>
                            Remove all
                        </Button>
                    </div>
                </div>
                <Cocktails
                    width={this.props.width}
                    height={
                        this.props.height - PADDING_HEIGHT * 2 - BUTTONS_HEIGHT
                    }
                    values={this.state.values}
                    size={Cocktails.sizes.large}
                    linkCreator={id => this.linkCreator(id)}
                    from={
                        this.props.cocktail ? this.props.cocktail.idDrink : null
                    }
                    favorites={this.props.favorites}
                    toggleFavorite={this.toggleFavorite}
                />
            </Fragment>
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
        cocktail: state.details.current.cocktail,
        favorites: state.favorites,
    }),
    {
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        loadMissingValues,
        updateOutdatedValues,
    }
)(FavoritesContent);
