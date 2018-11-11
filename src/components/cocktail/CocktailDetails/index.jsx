import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ActionButton from "../../common/ActionButton";
import Icon from "../../common/Icon";
import Card from "../../common/Card";
import CocktailData from "../CocktailData";
import { loadCocktailDetails, moveToURL } from "../../../actions/cocktail";
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
    }

    toggleFavorite = () => {
        if (this.state.favorite) {
            this.props.removeFromFavorites(this.state.id);
        } else {
            this.props.addToFavorites(this.state.id, this.props.value);
        }
    };

    renderLeftButton = () => {
        const onClick = this.state.left
            ? () => {
                  this.props.moveToURL(this.state.left);
              }
            : null;
        return (
            <ActionButton disabled={!this.state.left} onClick={onClick}>
                <Icon type={Icon.types.arrowLeft} />
            </ActionButton>
        );
    };

    renderRightButton = () => {
        const onClick = this.state.right
            ? () => {
                  this.props.moveToURL(this.state.right);
              }
            : null;
        return (
            <ActionButton disabled={!this.state.right} onClick={onClick}>
                <Icon type={Icon.types.arrowRight} />
            </ActionButton>
        );
    };

    renderCloseButton = () => {
        return (
            <ActionButton
                onClick={() => this.props.moveToURL(this.props.getBackURL())}
            >
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
        let left = null;
        let right = null;
        if (results.length) {
            const index = results.findIndex(
                item => item.idDrink === this.state.id
            );
            if (index > 0) {
                left = locationCreator(results[index - 1].idDrink);
            }
            if (index < results.length - 1 && index >= 0) {
                right = locationCreator(results[index + 1].idDrink);
            }
        }
        this.setState({ left, right });
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
    { loadCocktailDetails, moveToURL, addToFavorites, removeFromFavorites }
)(CocktailDetails);
