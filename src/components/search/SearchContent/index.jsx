import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktails/CocktailDetails";
import { searchTypes } from "../../../constants/search";
import locations from "../../../constants/locations";

import "./SearchContent.css";

class SearchContent extends Component {
    renderCocktailDetails = () => {
        return <CocktailDetails />;
    };

    renderCocktails = () => {
        return (
            <Cocktails
                values={this.props.results}
                size={
                    this.props.requestType === searchTypes.filter
                        ? Cocktails.sizes.small
                        : Cocktails.sizes.large
                }
                linkCreator={id => `${locations.searchCocktail}/${id}`}
            />
        );
    };

    render() {
        return (
            <div className="search-content">
                <span>
                    Search results:
                    <br />
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
                </span>
            </div>
        );
    }
}

export default connect(state => ({
    requestType: state.search.request.type,
    results: state.search.response.results,
    location: state.router.location,
}))(SearchContent);
