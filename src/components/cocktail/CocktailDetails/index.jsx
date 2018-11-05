import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ActionButton from "../../common/ActionButton";
import Icon from "../../common/Icon";
import Card from "../../common/Card";
import CocktailData from "../CocktailData";
import { loadCocktailDetails } from "../../../actions/cocktail";
import { createCocktailTitle } from "../../../helpers/title";

import "./CocktailDetails.css";

class CocktailDetails extends Component {
    static propTypes = {
        returnToURL: PropTypes.func,
        results: PropTypes.array,
    };

    componentDidMount() {
        const id = this.props.location.pathname.substring(
            this.props.location.pathname.lastIndexOf("/") + 1
        );
        this.props.loadCocktailDetails(id);
    }

    renderLeftButton = () => {
        return (
            <ActionButton onClick={() => console.log("left")}>
                <Icon type={Icon.types.arrowLeft} />
            </ActionButton>
        );
    };

    renderRightButton = () => {
        return (
            <ActionButton onClick={() => console.log("right")}>
                <Icon type={Icon.types.arrowRight} />
            </ActionButton>
        );
    };

    renderCloseButton = () => {
        return (
            <ActionButton onClick={() => this.props.returnToURL()}>
                <Icon type={Icon.types.remove} />
            </ActionButton>
        );
    };

    render() {
        return (
            <div className="cocktail-details">
                <div className="cocktail-details__card">
                    <Card
                        renderLeftButton={this.renderLeftButton}
                        renderRightButton={this.renderRightButton}
                        renderCloseButton={this.renderCloseButton}
                    >
                        <CocktailData value={this.props.value} />
                    </Card>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        createCocktailTitle(this.props.value ? this.props.value.strDrink : "");
    }
}

export default connect(
    state => ({
        value: state.cocktail.value,
        location: state.router.location,
    }),
    { loadCocktailDetails }
)(CocktailDetails);
