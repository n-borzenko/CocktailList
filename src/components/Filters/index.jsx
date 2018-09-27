import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FiltersCluster from "../FiltersCluster";
import { getFiltersList } from "../../actions/filters";

import "./Filters.css";

class Filters extends Component {
    static propTypes = {
        selectFilter: PropTypes.func,
    };

    componentDidMount() {
        this.props.getFiltersList();
    }

    selectFilter = (type, name) => {
        this.props.selectFilter({ type, name });
    };

    renderFiltersClusters() {
        const checkSelection = filterType => {
            return this.props.current && this.props.current.type === filterType
                ? this.props.current.name
                : null;
        };

        return Object.entries(this.props.filters).map(([key, value]) => (
            <FiltersCluster
                type={key}
                values={value}
                key={key}
                selected={checkSelection(key)}
                selectFilter={this.selectFilter}
            />
        ));
    }

    render() {
        return <div className="filters">{this.renderFiltersClusters()}</div>;
    }
}

export default connect(
    state => ({ filters: state.filters, current: state.search.request.filter }),
    { getFiltersList }
)(Filters);
