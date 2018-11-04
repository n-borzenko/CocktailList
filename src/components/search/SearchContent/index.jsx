import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktail/CocktailDetails";
import { searchTypes } from "../../../constants/search";
import locations from "../../../constants/locations";
import { stateToSearchURL } from "../../../actions/search";

import "./SearchContent.css";

class SearchContent extends Component {
    renderCocktailDetails = () => {
        return <CocktailDetails />;
    };

    linkCreator = id => {
        const parameters = stateToSearchURL(this.props.request).search || "";
        return `${locations.searchCocktail}/${id}${parameters}`;
    };

    renderCocktails = () => {
        return (
            <Cocktails
                width={this.props.width}
                height={this.props.height}
                values={this.props.results}
                size={
                    this.props.request.type === searchTypes.filter
                        ? Cocktails.sizes.small
                        : Cocktails.sizes.large
                }
                linkCreator={id => this.linkCreator(id)}
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
}))(SearchContent);
