import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Subheader from "../../common/Subheader";
import ButtonGroup from "../../common/ButtonGroup";
import SearchField from "../../common/SearchField";
import FiltersParameters from "../FiltersParameters";
import { createSearchTitle } from "../../../helpers/title";
import { pathDataFromLocation } from "../../../helpers/pathData";

import {
    searchByQuery,
    searchByFilter,
    searchByURL,
} from "../../../actions/search";
import locations from "../../../constants/locations";
import { searchTypes } from "../../../constants/search";

import "./SearchParameters.css";

class SearchParameters extends Component {
    state = {
        modes: [`By ${searchTypes.query}`, `By ${searchTypes.filter}`],
    };

    componentDidMount() {
        this.props.searchByURL(this.props.location);
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.location !== prevProps.location &&
            this.checkUpdateForSearch(prevProps)
        ) {
            this.props.searchByURL(this.props.location);
        }
        createSearchTitle(this.props.request);
    }

    checkUpdateForSearch = prevProps => {
        const newPath = pathDataFromLocation(this.props.location);
        const oldPath = pathDataFromLocation(prevProps.location);
        return (
            newPath.shortPath !== oldPath.shortPath ||
            newPath.query !== oldPath.query
        );
    };

    changeMode = index => {
        index === 0
            ? this.props.searchByQuery(this.props.request.query, true)
            : this.props.searchByFilter(this.props.request.filter);
    };

    updateQuery = (query, immediately = false) => {
        this.props.searchByQuery(query, immediately);
    };

    selectFilter = filter => {
        this.props.searchByFilter(filter);
    };

    renderSearchField = () => {
        return (
            <SearchField
                onSearch={this.updateQuery}
                placeholder="Cocktail name"
                value={this.props.request.query}
                name="cocktail-name"
            />
        );
    };

    renderFiltersParameters = () => {
        return <FiltersParameters selectFilter={this.selectFilter} />;
    };

    renderSearchParameters = () => {
        const selected = this.props.request.type === searchTypes.filter ? 1 : 0;
        return (
            <div className="search-parameters">
                <div className="search-parameters__header">
                    <Subheader>Parameters</Subheader>
                </div>
                <div className="search-parameters__selector">
                    <ButtonGroup
                        values={this.state.modes}
                        selected={selected}
                        onSelect={this.changeMode}
                    />
                </div>
                <div>
                    <Switch location={this.props.location}>
                        <Route
                            path={locations.searchByFilter}
                            render={this.renderFiltersParameters}
                        />
                        <Route
                            path={locations.search}
                            render={this.renderSearchField}
                        />
                    </Switch>
                </div>
            </div>
        );
    };

    render() {
        return (
            <Switch location={this.props.location}>
                <Route path={locations.searchCocktail} render={() => null} />
                <Route
                    path={locations.search}
                    render={this.renderSearchParameters}
                />
            </Switch>
        );
    }
}

export default connect(
    state => ({
        request: state.search.request,
        location: state.router.location,
    }),
    { searchByQuery, searchByFilter, searchByURL }
)(SearchParameters);
