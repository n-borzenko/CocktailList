import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import qs from "qs";

import { addToFavorites } from "../../../actions/favorites";
import {
    loadRandomCocktail,
    loadRandomCocktailDetails,
} from "../../../actions/random";
import locations from "../../../constants/locations";
import RandomCards from "../RandomCards";
import Cocktail from "../../cocktails/Cocktail";
import AnimatedIcon from "../../common/AnimatedIcon";
import Icon from "../../common/Icon";
import { createRandomTitle } from "../../../helpers/title";

import "./RandomBoard.css";

class RandomBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    componentDidMount() {
        const id = this.getIdFromLocation();
        this.requestUpdates(id);
        this.checkUpdates(id);
        createRandomTitle();
    }

    componentDidUpdate(prevProps) {
        const id = this.getIdFromLocation();
        const oldId = this.getIdFromLocation(prevProps.location);
        if (
            prevProps.location.pathname === this.props.location.pathname &&
            oldId !== null &&
            (id === null || id !== oldId)
        ) {
            this.requestUpdates(id);
        } else {
            this.checkUpdates(id);
        }
    }

    requestUpdates = id => {
        if (this.props.location.search && id) {
            if (!this.props.random.values[id]) {
                this.props.loadRandomCocktailDetails(id);
            }
        } else {
            this.props.loadRandomCocktail();
            this.setState({
                value: null,
            });
        }
        createRandomTitle();
    };

    checkUpdates = id => {
        if (id && this.props.random.id === id && this.props.random.values[id]) {
            const value = this.props.random.values[id];
            if (this.state.value !== value) {
                this.setState({
                    value,
                });
                createRandomTitle(value.strDrink);
            }
        }
    };

    getIdFromLocation = (location = this.props.location) => {
        if (!location.search || !location.search.length) {
            return null;
        }
        const parameters = qs.parse(location.search.substr(1));
        return parameters && parameters.id ? parameters.id : null;
    };

    addReaction = like => {
        if (like) {
            const { value } = this.state;
            this.props.addToFavorites(value.idDrink, value);
        }
        this.props.push(locations.random);
    };

    linkCreator = id => {
        return `${locations.randomCocktail}/${id}`;
    };

    isFavorite = () => {
        return (
            this.state.value !== null &&
            this.props.favorites.includes(this.state.value.idDrink)
        );
    };

    renderCocktail = isFavorite => {
        const value = this.state.value;
        return (
            <Cocktail
                value={value}
                to={this.linkCreator(value.idDrink)}
                skipFavorites={!isFavorite}
                disableFavorites={isFavorite}
            />
        );
    };

    renderStub = () => {
        return (
            <div className="random-board__stub">
                <span className="random-board__spinner">
                    <AnimatedIcon animation={AnimatedIcon.animation.forever}>
                        <Icon
                            type={Icon.types.spinner}
                            color={Icon.colors.light}
                        />
                    </AnimatedIcon>
                </span>
            </div>
        );
    };

    render() {
        const isFavorite = this.isFavorite();
        return (
            <div className="random-board">
                <RandomCards reaction={this.addReaction} favorite={isFavorite}>
                    {this.state.value
                        ? this.renderCocktail(isFavorite)
                        : this.renderStub()}
                </RandomCards>
            </div>
        );
    }
}

export default connect(
    state => ({
        favorites: state.favorites.ids,
        location: state.router.location,
        random: state.random,
    }),
    { addToFavorites, loadRandomCocktail, loadRandomCocktailDetails, push }
)(RandomBoard);
