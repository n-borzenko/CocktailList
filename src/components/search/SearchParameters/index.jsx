import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Subheader from "../../common/Subheader";
import ButtonGroup from "../../common/ButtonGroup";
import Filters from "../../Filters";
import SearchField from "../../common/SearchField";
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
    };

    componentDidMount() {
        this.props.searchByURL(this.props.location);
    }

    changeMode = index => {
        index === 0
            ? this.props.searchByQuery(this.props.search.query)
            : this.props.searchByFilter(this.props.search.filter);
    };

    renderSearchField = () => {
        return (
            <SearchField
                onSearch={this.props.searchByQuery}
                placeholder="Cocktail name"
                value={this.props.search.query}
            />
        );
    };

    render() {
        const selected = this.props.search.type === searchTypes.filter ? 1 : 0;
        console.log(selected);
        return (
            <div className="mode">
                <div className="mode__header">
                    <Subheader>Parameters</Subheader>
                </div>
                <div className="mode__selector">
                    <ButtonGroup
                        values={this.state.modes}
                        selected={selected}
                        onSelect={this.changeMode}
                    />
                </div>
                <div className="mode__criteria">
                    <Switch location={this.props.location}>
                        <Route
                            exact
                            path={locations.search}
                            render={this.renderSearchField}
                        />
                        <Route
                            path={locations.searchByFilter}
                            component={Filters}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        search: state.search,
        location: state.router.location,
    }),
    { searchByQuery, searchByFilter, searchByURL }
)(SearchParameters);
