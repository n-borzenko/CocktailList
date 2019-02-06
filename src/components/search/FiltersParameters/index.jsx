import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Filters from "../../filters/Filters";
import FilterSelector from "../../filters/FilterSelector";
import PopupContent from "../../common/popup/PopupContent";
import PopupPresenter from "../../common/popup/PopupPresenter";

import "./FiltersParameters.css";

class FiltersParameters extends Component {
    static propTypes = {
        selectFilter: PropTypes.func.isRequired,
    };

    state = { showPopup: false };

    componentDidUpdate(prevProps) {
        if (
            this.state.showPopup &&
            prevProps.location !== this.props.location
        ) {
            this.setState({ showPopup: false });
        }
    }

    closePopup = () => {
        this.setState({ showPopup: false });
    };

    openPopup = () => {
        this.setState({ showPopup: true });
    };

    renderPopupContent = () => {
        return (
            <PopupPresenter
                showPopup={this.state.showPopup}
                closePopup={this.closePopup}
            >
                <PopupContent title="Filters" onClick={this.closePopup}>
                    <Filters selectFilter={this.props.selectFilter} />
                </PopupContent>
            </PopupPresenter>
        );
    };

    render() {
        return (
            <div className="filters-parameters">
                {this.renderPopupContent()}
                <div className="filters-parameters__selector">
                    <FilterSelector
                        onSelect={this.openPopup}
                        filter={this.props.filter}
                    />
                </div>
                <div className="filters-parameters__values">
                    <Filters selectFilter={this.props.selectFilter} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    location: state.router.location,
    filter: state.search.request.filter,
}))(FiltersParameters);
