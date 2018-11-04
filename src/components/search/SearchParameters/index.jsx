import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Subheader from "../../common/Subheader";
import ButtonGroup from "../../common/ButtonGroup";
import SearchField from "../../common/SearchField";
import FiltersParameters from "../FiltersParameters";

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

    changeMode = index => {
        index === 0
            ? this.props.searchByQuery(this.props.request.query)
            : this.props.searchByFilter(this.props.request.filter);
    };

    updateQuery = (query, delay = true) => {
        this.props.searchByQuery(query, delay);
    };

    renderSearchField = () => {
        return (
            <SearchField
                onSearch={this.updateQuery}
                placeholder="Cocktail name"
                value={this.props.request.query}
            />
        );
    };

    selectFilter = filter => {
        this.props.searchByFilter(filter);
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

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.props.searchByURL(this.props.location);
        }
    }
}

export default connect(
    state => ({
        request: state.search.request,
        location: state.router.location,
    }),
    { searchByQuery, searchByFilter, searchByURL }
)(SearchParameters);
