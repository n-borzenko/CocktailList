import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktail/CocktailDetails";
import { searchTypes } from "../../../constants/search";
import locations from "../../../constants/locations";
import { pathDataFromLocation } from "../../../helpers/pathData";
import { stateToSearchURL } from "../../../actions/search";
import { clearDetailsHistory } from "../../../actions/details";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../../actions/favorites";

import "./SearchContent.css";

const PADDING_HEIGHT = 16;

class SearchContent extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        scrollBarWidth: PropTypes.number.isRequired,
    };

    static defaultProps = {
        width: 0,
        height: 0,
    };

    state = {
        scrollId: null,
    };

    componentDidUpdate() {
        const path = pathDataFromLocation(this.props.location);
        const lastItem = this.props.lastItems[path.shortPath];
        let scrollId = null;
        if (lastItem && path.query === lastItem.query && lastItem.id) {
            scrollId = lastItem.id;
        }
        if (scrollId !== this.state.scrollId) {
            this.setState({
                scrollId,
            });
        }
    }

    getBackURL = () => {
        return stateToSearchURL(this.props.request);
    };

    locationCreator = id => {
        const parameters = stateToSearchURL(this.props.request).search;
        return {
            pathname: `${locations.searchCocktail}/${id}`,
            search: parameters,
        };
    };

    linkCreator = id => {
        const parameters = stateToSearchURL(this.props.request).search;
        return `${locations.searchCocktail}/${id}${parameters}`;
    };

    toggleFavorite = (favorite, id, value = null) => {
        if (favorite) {
            const data =
                this.props.request.type === searchTypes.filter ? null : value;
            this.props.addToFavorites(id, data);
        } else {
            this.props.removeFromFavorites(id);
        }
    };

    renderCocktailDetails = () => {
        return (
            <div className="search-content search-content_details">
                <CocktailDetails
                    getBackURL={this.getBackURL}
                    results={this.props.results}
                    locationCreator={this.locationCreator}
                />
            </div>
        );
    };

    renderCocktails = () => {
        return (
            <div className="search-content">
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
                    from={this.state.scrollId}
                    favorites={this.props.favorites}
                    toggleFavorite={this.toggleFavorite}
                    clearScroll={this.props.clearDetailsHistory}
                    scrollBarWidth={this.props.scrollBarWidth}
                />
            </div>
        );
    };

    render() {
        return (
            <Switch location={this.props.location}>
                <Route
                    path={locations.searchCocktail}
                    render={this.renderCocktailDetails}
                />
                <Route path={locations.search} render={this.renderCocktails} />
            </Switch>
        );
    }
}

export default connect(
    state => ({
        request: state.search.request,
        results: state.search.response.results,
        location: state.router.location,
        lastItems: state.details.history,
        favorites: state.favorites,
    }),
    { addToFavorites, removeFromFavorites, clearDetailsHistory }
)(SearchContent);
