import React, { Component } from "react";
import SearchContext from "../context/SearchContext";
import "./Content.css";

class Content extends Component {
    render() {
        return (
            <div className="content">
                <SearchContext.Consumer>
                    {searchData => (
                        <span>
                            Search results for request: {searchData.text}
                            <br />
                            {searchData.results &&
                                searchData.results.map(item => (
                                    <span key={item.id}>
                                        {`${item.id}: ${item.name}`}
                                        <br />
                                    </span>
                                ))}
                        </span>
                    )}
                </SearchContext.Consumer>
            </div>
        );
    }
}

export default Content;
