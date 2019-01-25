import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { detailsToRandomURL } from "../../../actions/random";
import locations from "../../../constants/locations";
import CocktailDetails from "../../cocktail/CocktailDetails";
import RandomBoard from "../RandomBoard";

import "./RandomContent.css";

class RandomContent extends Component {
    getBackURL = () => {
        return detailsToRandomURL(this.props.location);
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
        return (
            <div className="random-content__board">
                <RandomBoard />
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

export default connect(state => ({
    location: state.router.location,
}))(RandomContent);
