import React, { Component } from "react";
import { connect } from "react-redux";

import "./SearchContent.css";

class SearchContent extends Component {
    render() {
        return (
            <div className="search-content">
                <span>
                    Search results for request: {this.props.text}
                    <br />
                    {this.props.results &&
                        this.props.results.map(item => (
                            <span key={item.idDrink}>
                                {`${item.idDrink}: ${item.strDrink}`}
                                <br />
                            </span>
                        ))}
                </span>
            </div>
        );
    }
}

export default connect(state => ({ ...state.search }))(SearchContent);
