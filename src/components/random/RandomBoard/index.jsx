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

import "./RandomBoard.css";

class RandomBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    componentDidMount() {
        console.log("REQUEST updates");
        const id = this.getIdFromLocation();
        this.requestUpdates(id);
        this.checkUpdates(id);
    }

    componentDidUpdate(prevProps) {
        console.log(`#### did update`);
        if (prevProps !== this.props) {
            console.log(prevProps);
            console.log(this.props);
        }

        const id = this.getIdFromLocation();
        if (
            prevProps.location.pathname === this.props.location.pathname &&
            this.getIdFromLocation(prevProps.location) !== null &&
            id === null
        ) {
            console.log("REQUEST updates");
            this.requestUpdates(id);
        } else {
            console.log("CHECK FOR updates");
            this.checkUpdates(id);
        }
    }

    requestUpdates = id => {
        console.log(id);
        if (this.props.location.search && id) {
            if (!this.props.random.values[id]) {
                this.props.loadRandomCocktailDetails(id);
            } else {
                console.log("NOT REQUESTED");
            }
        } else {
            this.props.loadRandomCocktail();
            this.setState({
                value: null,
            });
        }
    };

    checkUpdates = id => {
        if (id && this.props.random.id === id && this.props.random.values[id]) {
            const value = this.props.random.values[id];
            if (this.state.value !== value) {
                console.log("UPDATING local state");
                this.setState({
                    value,
                });
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

    addReaction = () => {
        this.props.push(locations.random);
    };

    linkCreator = id => {
        return `${locations.randomCocktail}/${id}`;
    };

    renderCocktail = () => {
        const value = this.state.value;
        return (
            <Cocktail
                value={value}
                to={this.linkCreator(value.idDrink)}
                skipFavorites
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
        return (
            <div className="random-board">
                <RandomCards reaction={this.addReaction}>
                    {this.state.value
                        ? this.renderCocktail()
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
