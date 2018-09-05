import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Subheader from "../../common/Subheader";
import ButtonGroup from "../../common/ButtonGroup";
import Filters from "../../Filters";
import SearchField from "../../common/SearchField";
import { startSearch, applyFilter } from "../../../actions/search";
import locations from "../../../constants/locations";

import "./SearchParameters.css";

class SearchParameters extends Component {
    state = {
        modes: ["By query", "By filter"],
    };

    componentDidMount() {
        // this.props.startSearch();
    }

    changeMode = index => {
        index === 0 ? this.props.startSearch() : this.props.applyFilter();
    };

    renderSearchField = () => {
        return (
            <SearchField
                onSearch={this.props.startSearch}
                placeholder="Cocktail name"
            />
        );
    };

    render() {
        const selected = this.props.search.type === "filters" ? 1 : 0;
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
                            path={locations.searchByFilters}
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
    { startSearch, applyFilter }
)(SearchParameters);
