import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../../common/Button";
import Filters from "../../filters/Filters";
import PopupContent from "../../common/popup/PopupContent";
import PopupPresenter from "../../common/popup/PopupPresenter";

import "./FiltersParameters.css";

class FiltersParameters extends Component {
    static propTypes = {
        selectFilter: PropTypes.func.isRequired,
    };

    state = { showPopup: false };

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
                <div className="filters-parameters__button">
                    <Button stretched onClick={this.openPopup}>
                        Select filter
                    </Button>
                </div>
                <div className="filters-parameters__values">
                    <Filters selectFilter={this.props.selectFilter} />
                </div>
            </div>
        );
    }
}

export default FiltersParameters;
