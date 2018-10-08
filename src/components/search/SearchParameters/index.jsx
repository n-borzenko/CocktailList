import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Subheader from "../../common/Subheader";
import Button from "../../common/Button";
import ButtonGroup from "../../common/ButtonGroup";
import Filters from "../../filters/Filters";
import SearchField from "../../common/SearchField";
import Popup from "../../common/Popup";
import PopupContent from "../../common/PopupContent";
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
        modes: [`by ${searchTypes.query}`, `by ${searchTypes.filter}`],
        showFiltersPopup: false,
    };

    checkWidth = () => {
        if (this.state.showFiltersPopup && window.innerWidth > 400) {
            this.closePopup();
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.checkWidth);
        this.props.searchByURL(this.props.location);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkWidth);
    }

    changeMode = index => {
        index === 0
            ? this.props.searchByQuery(this.props.request.query)
            : this.props.searchByFilter(this.props.request.filter);
    };

    onSearch = (query, delay = true) => {
        this.props.searchByQuery(query, delay);
    };

    selectFilter = filter => {
        this.props.searchByFilter(filter);
    };

    renderSearchField = () => {
        return (
            <SearchField
                onSearch={this.onSearch}
                placeholder="Cocktail name"
                value={this.props.request.query}
            />
        );
    };

    renderFilters = () => {
        return (
            <div className="search-parameters__filters-container">
                {this.renderPopup()}
                <div className="search-parameters__filters-button">
                    <Button
                        stretched
                        onClick={() =>
                            this.setState({ showFiltersPopup: true })
                        }
                    >
                        select filter
                    </Button>
                </div>
                <div className="search-parameters__filters">
                    <Filters selectFilter={this.selectFilter} />
                </div>
            </div>
        );
    };

    closePopup = () => {
        this.setState({
            showFiltersPopup: false,
        });
    };

    renderPopup = () => {
        return !this.state.showFiltersPopup ? null : (
            <Popup>
                <PopupContent title="Filters" onClick={this.closePopup}>
                    <Filters selectFilter={this.selectFilter} />
                </PopupContent>
            </Popup>
        );
    };

    render() {
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
                <div className="search-parameters__details">
                    <Switch location={this.props.location}>
                        <Route
                            exact
                            path={locations.search}
                            render={this.renderSearchField}
                        />
                        <Route
                            path={locations.searchByFilter}
                            render={this.renderFilters}
                        />
                    </Switch>
                </div>
            </div>
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
