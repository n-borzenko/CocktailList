import React, { Component } from "react";
import { connect } from "react-redux";
import "./Content.css";

class Content extends Component {
    render() {
        return (
            <div className="content">
                <span>
                    Search results for request: {this.props.text}
                    <br />
                    {this.props.results &&
                        this.props.results.map(item => (
                            <span key={item.id}>
                                {`${item.id}: ${item.name}`}
                                <br />
                            </span>
                        ))}
                </span>
            </div>
        );
    }
}

export default connect(state => ({ ...state.search }))(Content);
