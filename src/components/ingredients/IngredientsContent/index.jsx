import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import qs from "qs";
import PropTypes from "prop-types";

import Ingredients from "../Ingredients";
import IngredientDetails from "../IngredientDetails";
import locations from "../../../constants/locations";
import { getIngredientsList } from "../../../actions/filters";
import { createIngredientsTitle } from "../../../helpers/title";
import {
    clearDetailsHistory,
    loadCocktailDetails,
} from "../../../actions/details";

import "./IngredientsContent.css";

const PADDING_HEIGHT = 16;

class IngredientsContent extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    static defaultProps = {
        width: 0,
        height: 0,
    };

    state = {
        useCocktail: false,
    };

    componentDidMount() {
        const parameters = qs.parse(this.props.location.search);
        if (
            parameters &&
            parameters.hasOwnProperty("id") &&
            parameters.id &&
            parameters.id.length
        ) {
            if (
                !this.props.cocktail ||
                this.props.cocktail.idDrink !== parameters.id
            ) {
                this.props.loadCocktailDetails(parameters.id);
            }
            this.setState({ useCocktail: true });
        } else {
            this.props.getIngredientsList();
        }
        createIngredientsTitle();
    }

    getBackURL = () => {
        let pathname = locations.ingredients;
        let search = "";
        const parameters = qs.parse(this.props.location.search);
        if (
            parameters &&
            parameters.hasOwnProperty("id") &&
            parameters.id &&
            parameters.id.length
        ) {
            if (
                parameters.hasOwnProperty("area") &&
                parameters.area &&
                parameters.area.length
            ) {
                switch (parameters.area) {
                    case "favorites":
                        pathname = `${locations.favoritesCocktail}/${
                            parameters.id
                        }`;
                        break;
                    case "random":
                        pathname = `${locations.randomCocktail}/${
                            parameters.id
                        }`;
                        break;
                    default:
                        pathname = `${locations.searchCocktail}/${
                            parameters.id
                        }`;
                }
                const { query, type, name } = parameters;
                const newParameters = qs.stringify({ query, type, name });
                if (newParameters && newParameters.length) {
                    search = `?${newParameters}`;
                }
            }
        }
        return { pathname, search };
    };

    linkCreator = title => {
        return `${locations.ingredientsDetails}?${qs.stringify({ title })}`;
    };

    locationCreator = title => {
        const parameters = qs.parse(this.props.location.search.substring(1));
        return {
            pathname: `${locations.ingredientsDetails}`,
            search: `?${qs.stringify({ ...parameters, title })}`,
        };
    };

    createResultsFromCocktail = () => {
        const results = [];
        const { cocktail } = this.props;
        if (!cocktail) {
            return results;
        }
        let i = 1;
        while (cocktail.hasOwnProperty(`strIngredient${i}`)) {
            const name = cocktail[`strIngredient${i++}`];
            if (name && name.length) {
                results.push(name);
            }
        }
        return results;
    };

    renderIngredientsDetails = () => {
        return (
            <IngredientDetails
                getBackURL={this.getBackURL}
                results={
                    this.state.useCocktail
                        ? this.createResultsFromCocktail()
                        : this.props.ingredients
                }
                locationCreator={this.locationCreator}
            />
        );
    };

    renderIngredients = () => {
        const id =
            this.props.lastItem && this.props.lastItem.id
                ? this.props.lastItem.id
                : null;
        return (
            <Ingredients
                width={this.props.width}
                height={this.props.height - PADDING_HEIGHT * 2}
                values={this.props.ingredients}
                linkCreator={id => this.linkCreator(id)}
                from={id}
                clearScroll={this.props.clearDetailsHistory}
            />
        );
    };

    render() {
        return (
            <div className="ingredients-content">
                <Switch location={this.props.location}>
                    <Route
                        path={locations.ingredientsDetails}
                        render={this.renderIngredientsDetails}
                    />
                    <Route
                        path={locations.ingredients}
                        render={this.renderIngredients}
                    />
                </Switch>
            </div>
        );
    }
}

export default connect(
    state => ({
        location: state.router.location,
        lastItem: state.details.history[locations.ingredients],
        ingredients: state.filters.ingredient,
        cocktail: state.details.current.cocktail,
    }),
    {
        getIngredientsList,
        clearDetailsHistory,
        loadCocktailDetails,
    }
)(IngredientsContent);
