import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import SearchParameters from "../search/SearchParameters";
import locations from "../../constants/locations";

class Parameters extends Component {
    render() {
        return (
            <Switch location={this.props.location}>
                <Route path={locations.search} component={SearchParameters} />
            </Switch>
        );
    }
}

export default connect(state => ({
    location: state.router.location,
}))(Parameters);
