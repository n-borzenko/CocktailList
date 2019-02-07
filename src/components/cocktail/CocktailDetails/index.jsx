import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CocktailData from "../CocktailData";
import { loadCocktailDetails } from "../../../actions/details";
import { createCocktailTitle } from "../../../helpers/title";
import { areaFromLocation } from "../../../helpers/areas";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../../actions/favorites";
import Details from "../../common/Details";

class CocktailDetails extends Component {
    static propTypes = {
        getBackURL: PropTypes.func.isRequired,
        results: PropTypes.array.isRequired,
        locationCreator: PropTypes.func.isRequired,
        skipArrows: PropTypes.bool.isRequired,
        skipFavorites: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        results: [],
        locationCreator: () => null,
        skipArrows: false,
        skipFavorites: false,
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

    toggleFavorite = () => {
        if (this.state.favorite) {
            this.props.removeFromFavorites(this.state.id);
        } else {
            this.props.addToFavorites(this.state.id, this.props.value);
        }
    };

    createIngredientsBackParameters = () => {
        const area = areaFromLocation(this.props.location);
        const areaIndex = area.area.indexOf("/", 1);
        const areaName =
            areaIndex > 0
                ? area.area.substring(1, areaIndex)
                : area.area.substring(1);
        const result = `area=${areaName}&id=${this.state.id}`;
        return area.query ? result + `&${area.query}` : result;
    };

    render() {
        return (
            <Details
                getBackURL={this.props.getBackURL}
                previousURL={this.state.left}
                nextURL={this.state.right}
                skipArrows={this.props.skipArrows}
            >
                <CocktailData
                    value={this.props.value}
                    favorite={this.state.favorite}
                    toggleFavorite={this.toggleFavorite}
                    skipFavorites={this.props.skipFavorites}
                    parametersCreator={this.createIngredientsBackParameters}
                />
            </Details>
        );
    }
}

export default connect(
    state => ({
        value: state.details.current.cocktail,
        location: state.router.location,
        favorites: state.favorites.ids,
    }),
    { loadCocktailDetails, addToFavorites, removeFromFavorites }
)(CocktailDetails);
