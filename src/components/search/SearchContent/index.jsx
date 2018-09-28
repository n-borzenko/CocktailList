import React, { Component } from "react";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";

import "./SearchContent.css";

class SearchContent extends Component {
    render() {
        return (
            <div className="search-content">
                <span>
                    Search results:
                    <br />
                    <Cocktails values={this.props.results} />
                </span>
            </div>
        );
    }
}

export default connect(state => ({ results: state.search.response.results }))(
    SearchContent
);
