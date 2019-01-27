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

    componentDidMount() {
        this.props.getIngredientsList();
        createIngredientsTitle();
    }

    getBackURL = () => {
        return { pathname: locations.ingredients, search: "" };
    };

    linkCreator = name => {
        return `${locations.ingredientsDetails}?${qs.stringify({ name })}`;
    };

    locationCreator = name => {
        return {
            pathname: `${locations.ingredientsDetails}`,
            search: `?${qs.stringify({ name })}`,
        };
    };

    renderIngredientsDetails = () => {
        return (
            <IngredientDetails
                getBackURL={this.getBackURL}
                results={this.props.ingredients}
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
    }),
    {
        getIngredientsList,
    }
)(IngredientsContent);
