import React, { Component } from "react";
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

    changeMode = index => {
        this.setState({ selectedMode: index });
    };

    renderSearchCriteria() {
        if (this.state.selectedMode === 1) {
            return <RoundedCollection />;
        }
        return <SearchField />;
    }

    render() {
        return (
            <div className="mode">
                <div className="mode__header">
                    <Subheader>Mode</Subheader>
                </div>
                <div className="mode__selector">
                    <ButtonGroup
                        values={this.state.modes}
                        selected={this.state.selectedMode}
                        onSelect={this.changeMode}
                    />
                </div>
                <div className="mode__criteria">
                    {this.renderSearchCriteria()}
                </div>
            </div>
        );
    }
}

export default Mode;
