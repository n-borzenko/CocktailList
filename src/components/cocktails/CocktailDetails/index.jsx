import React, { Component } from "react";
import { connect } from "react-redux";

import Summary from "../Summary";
import Subheader from "../../common/Subheader";
import Title from "../../common/Title";
import IngredientsList from "../IngredientsList";
import { loadCocktailDetails } from "../../../actions/cocktail";

import "./CocktailDetails.css";

class CocktailDetails extends Component {
    componentDidMount() {
        const id = this.props.location.pathname.substring(
            this.props.location.pathname.lastIndexOf("/") + 1
        );
        this.props.loadCocktailDetails(id);
    }

    renderAll = () => {
        if (!this.props.value) {
            return null;
        }
        return (
            <div>
                <Subheader> {this.props.value.strDrink}</Subheader>
                <Title>Summary</Title>
                <Summary value={this.props.value} />
                <Title>Instructions</Title>
                {this.props.value.strInstructions}
                <Title>ingredients</Title>
                <IngredientsList value={this.props.value} />
            </div>
        );
    };

    render() {
        return <div className="cocktail-details">ololo {this.renderAll()}</div>;
    }
}

export default connect(
    state => ({
        value: state.cocktail.value,
        location: state.router.location,
    }),
    { loadCocktailDetails }
)(CocktailDetails);
