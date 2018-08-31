import React, { Component } from "react";
import { connect } from "react-redux";

import { startSearch } from "../../actions/search";
import Subheader from "../common/Subheader";
import ButtonGroup from "../common/ButtonGroup";
import RoundedCollection from "../RoundedCollection";
import SearchField from "../common/SearchField";

import "./Mode.css";

class Mode extends Component {
    state = {
        modes: ["By query", "By first letter"],
        selectedMode: 0,
    };

    componentDidMount() {
        this.props.startSearch();
    }

    changeMode = index => {
        this.setState({ selectedMode: index });
    };

    renderSearchCriteria() {
        if (this.state.selectedMode === 1) {
            return <RoundedCollection />;
        }
        return (
            <SearchField
                onSearch={this.props.startSearch}
                placeholder="Cocktail name"
            />
        );
    }

    render() {
        return (
            <div className="mode">
                <div className="mode__header">
                    <Subheader>Mode</Subheader>
                </div>
                {/* <div className="mode__selector">
                    <ButtonGroup
                        values={this.state.modes}
                        selected={this.state.selectedMode}
                        onSelect={this.changeMode}
                    />
                </div> */}
                <div className="mode__criteria">
                    {this.renderSearchCriteria()}
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { startSearch }
)(Mode);
