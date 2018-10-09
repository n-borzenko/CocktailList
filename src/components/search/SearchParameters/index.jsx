import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Subheader from "../../common/Subheader";
import Button from "../../common/Button";
import ButtonGroup from "../../common/ButtonGroup";
import Filters from "../../filters/Filters";
import SearchField from "../../common/SearchField";
import PopupContent from "../../common/popup/PopupContent";
import PopupPresenter from "../../common/popup/PopupPresenter";
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
        showPopup: false,
    };

    componentDidMount() {
        this.props.searchByURL(this.props.location);
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
                {this.renderPopupContent()}
                <div className="search-parameters__filters-button">
                    <Button
                        stretched
                        onClick={() => this.setState({ showPopup: true })}
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
        this.setState({ showPopup: false });
    };

    renderPopupContent = () => {
        return (
            <PopupPresenter
                showPopup={this.state.showPopup}
                closePopup={this.closePopup}
            >
                <PopupContent title="Filters" onClick={this.closePopup}>
                    <Filters selectFilter={this.selectFilter} />
                </PopupContent>
            </PopupPresenter>
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
                            path={locations.searchByFilter}
                            render={this.renderFilters}
                        />
                        <Route
                            path={locations.search}
                            render={this.renderSearchField}
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
