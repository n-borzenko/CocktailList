import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { push } from "connected-react-router";

import ActionButton from "../../common/ActionButton";
import Icon from "../../common/Icon";
import Card from "../../common/Card";
import CocktailData from "../CocktailData";
import { loadCocktailDetails } from "../../../actions/cocktail";
import { createCocktailTitle } from "../../../helpers/title";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../../actions/favorites";

import "./CocktailDetails.css";

class CocktailDetails extends Component {
    static propTypes = {
        getBackURL: PropTypes.func.isRequired,
        results: PropTypes.array.isRequired,
        locationCreator: PropTypes.func.isRequired,
    };

    state = { left: null, right: null };

    static getDerivedStateFromProps(props) {
        const id = props.location.pathname.substring(
            props.location.pathname.lastIndexOf("/") + 1
        );
        return {
            id,
            favorite: props.favorites.includes(id),
        };
    }

    componentDidMount() {
        this.props.loadCocktailDetails(this.state.id);
        this.createLinks();
        createCocktailTitle(this.props.value ? this.props.value.strDrink : "");
    }

    toggleFavorite = () => {
        if (this.state.favorite) {
            this.props.removeFromFavorites(this.state.id);
        } else {
            this.props.addToFavorites(this.state.id, this.props.value);
        }
    };

    showPrevious = () => {
        this.props.push(this.state.left);
    };

    renderLeftButton = () => {
        return (
            <ActionButton
                disabled={!this.state.left}
                onClick={this.showPrevious}
            >
                <Icon type={Icon.types.arrowLeft} />
            </ActionButton>
        );
    };

    showNext = () => {
        this.props.push(this.state.right);
    };

    renderRightButton = () => {
        return (
            <ActionButton disabled={!this.state.right} onClick={this.showNext}>
                <Icon type={Icon.types.arrowRight} />
            </ActionButton>
        );
    };

    closeCocktailDetails = () => {
        this.props.push(this.props.getBackURL());
    };

    renderCloseButton = () => {
        return (
            <ActionButton onClick={this.closeCocktailDetails}>
                <Icon type={Icon.types.remove} />
            </ActionButton>
        );
    };

    render() {
        return (
            <div className="cocktail-details">
                <div className="cocktail-details__card">
                    <Card
                        leftButton={this.renderLeftButton()}
                        rightButton={this.renderRightButton()}
                        closeButton={this.renderCloseButton()}
                    >
                        <CocktailData
                            value={this.props.value}
                            favorite={this.state.favorite}
                            toggleFavorite={this.toggleFavorite}
                        />
                    </Card>
                </div>
            </div>
        );
    }

    createLinks = () => {
        const { results, locationCreator } = this.props;
        const index = results.findIndex(item => item.idDrink === this.state.id);
        this.setState(state => {
            if (index > 0) {
                return { left: locationCreator(results[index - 1].idDrink) };
            }
            return { left: null };
        });
        this.setState(state => {
            if (index < results.length - 1 && index >= 0) {
                return { right: locationCreator(results[index + 1].idDrink) };
            }
            return { right: null };
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.loadCocktailDetails(this.state.id);
        }
        if (
            this.props.value !== prevProps.value ||
            this.props.results !== prevProps.results
        ) {
            this.createLinks();
        }
        createCocktailTitle(this.props.value ? this.props.value.strDrink : "");
    }
}

export default connect(
    state => ({
        value: state.cocktail.value,
        location: state.router.location,
        favorites: state.favorites.ids,
    }),
    { loadCocktailDetails, addToFavorites, removeFromFavorites, push }
)(CocktailDetails);
