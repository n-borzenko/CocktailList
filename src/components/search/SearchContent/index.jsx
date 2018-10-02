import React, { Component } from "react";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import { searchTypes } from "../../../constants/search";

import "./SearchContent.css";

class SearchContent extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.results !== nextProps.results;
    }
    render() {
        return (
            <div className="search-content">
                <span>
                    Search results:
                    <br />
                    <Cocktails
                        values={this.props.results}
                        size={
                            this.props.requestType === searchTypes.filter
                                ? Cocktails.sizes.small
                                : Cocktails.sizes.large
                        }
                    />
                </span>
            </div>
        );
    }
}

export default connect(state => ({
    requestType: state.search.request.type,
    results: state.search.response.results,
}))(SearchContent);
