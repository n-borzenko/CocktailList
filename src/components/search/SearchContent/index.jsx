import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktail/CocktailDetails";
import { searchTypes } from "../../../constants/search";
import locations from "../../../constants/locations";
import { stateToSearchURL } from "../../../actions/search";

import "./SearchContent.css";

const PADDING_HEIGHT = 24;

class SearchContent extends Component {
    renderCocktailDetails = () => {
        return (
            <CocktailDetails
                getBackURL={this.getBackURL}
                results={this.props.results}
                locationCreator={this.locationCreator}
            />
        );
    };

    getBackURL = () => {
        return stateToSearchURL(this.props.request);
    };

    locationCreator = id => {
        const parameters = stateToSearchURL(this.props.request).search || "";
        return {
            pathname: `${locations.searchCocktail}/${id}`,
            search: parameters,
        };
    };

    linkCreator = id => {
        const parameters = stateToSearchURL(this.props.request).search || "";
        return `${locations.searchCocktail}/${id}${parameters}`;
    };

    renderCocktails = () => {
        return (
            <Cocktails
                width={this.props.width}
                height={this.props.height - PADDING_HEIGHT * 2}
                values={this.props.results}
                size={
                    this.props.request.type === searchTypes.filter
                        ? Cocktails.sizes.small
                        : Cocktails.sizes.large
                }
                linkCreator={id => this.linkCreator(id)}
                from={this.props.cocktail ? this.props.cocktail.idDrink : null}
            />
        );
    };

    render() {
        return (
            <div className="search-content">
                <Switch location={this.props.location}>
                    <Route
                        path={locations.searchCocktail}
                        render={this.renderCocktailDetails}
                    />
                    <Route
                        path={locations.search}
                        render={this.renderCocktails}
                    />
                </Switch>
            </div>
        );
    }
}

export default connect(state => ({
    request: state.search.request,
    results: state.search.response.results,
    location: state.router.location,
    cocktail: state.cocktail.value,
}))(SearchContent);
