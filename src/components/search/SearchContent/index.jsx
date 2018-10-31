import React, { Component } from "react";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import { searchTypes } from "../../../constants/search";
import { locations } from "../../../constants/locations";

import "./SearchContent.css";

class SearchContent extends Component {
    render() {
        return (
            <div className="search-content">
                <Cocktails
                    width={this.props.width}
                    height={this.props.height}
                    values={this.props.results}
                    size={
                        this.props.requestType === searchTypes.filter
                            ? Cocktails.sizes.small
                            : Cocktails.sizes.large
                    }
                    linkCreator={id => `${locations.cocktail}/${id}`}
                />
            </div>
        );
    }
}

export default connect(state => ({
    requestType: state.search.request.type,
    results: state.search.response.results,
}))(SearchContent);
