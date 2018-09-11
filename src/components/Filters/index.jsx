import React, { Component } from "react";
import { connect } from "react-redux";

import FilterBlock from "../FilterBlock";
import Tag from "../Tag";
import { getFiltersList } from "../../actions/filters";

import "./Filters.css";

class Filters extends Component {
    componentDidMount() {
        this.props.getFiltersList();
    }

    renderItems = () => {
        if (this.state.items === undefined) {
            return null;
        }
        return (
            <div className="filters__list">
                {this.state.items.map(item => (
                    <div
                        className="filters__item"
                        key={`${item.type}_${item.title}`}
                    >
                        <Tag type={item.type}>{item.title}</Tag>
                    </div>
                ))}
            </div>
        );
    };

    renderFiltersBlocks() {
        // return <div className="filters__header" />;
        return Object.entries(this.props.filters).map(([key, value]) => (
            <FilterBlock type={key} values={value} key={key} />
        ));
    }

    render() {
        return <div className="filters">{this.renderFiltersBlocks()}</div>;
    }
}

export default connect(
    state => ({ filters: state.filters }),
    { getFiltersList }
)(Filters);
