import React, { Component } from "react";
import { connect } from "react-redux";

import Summary from "../Summary";
import Subheader from "../../common/Subheader";
import Title from "../../common/Title";
import IngredientsList from "../IngredientsList";
import Picture from "../../common/Picture";
import Button from "../../common/Button";
import { loadCocktailDetails } from "../../../actions/cocktail";

import "./CocktailDetails.css";

class CocktailDetails extends Component {
    state = {
        favorite: false,
    };

    toggleFavorite = () => {
        this.setState({ favorite: !this.state.favorite });
    };

    componentDidMount() {
        const id = this.props.location.pathname.substring(
            this.props.location.pathname.lastIndexOf("/") + 1
        );
        this.props.loadCocktailDetails(id);
    }

    renderHeader = () => {
        return (
            <div className="cocktail-card__header">
                <div className="cocktail-card__picture-wrapper">
                    <div className="cocktail-card__picture">
                        <Picture source={this.props.value.strDrinkThumb} />
                    </div>
                </div>

                <div className="cocktail-card__main-data">
                    <Subheader> {this.props.value.strDrink}</Subheader>
                    <div className="cocktail-card__section cocktail-card__section_summary">
                        <div className="cocktail-card__title">
                            <Title>Summary</Title>
                        </div>
                        <Summary value={this.props.value} />
                    </div>

                    <div className="cocktail-card__favorites">
                        <Button onClick={this.toggleFavorite} stretched>
                            {this.state.favorite
                                ? "Remove from favorites"
                                : "Add to favorites"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    renderAll = () => {
        if (!this.props.value) {
            return null;
        }
        return (
            <div className="cocktail-card">
                <div className="cocktail-card__content">
                    {this.renderHeader()}

                    <div className="cocktail-card__section">
                        <div className="cocktail-card__title">
                            <Title>Instructions</Title>
                        </div>
                        {this.props.value.strInstructions}
                    </div>

                    <div className="cocktail-card__section">
                        <div className="cocktail-card__title">
                            <Title>Ingredients</Title>
                        </div>
                        <IngredientsList value={this.props.value} />
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return <div className="cocktail-details">{this.renderAll()}</div>;
    }
}

export default connect(
    state => ({
        value: state.cocktail.value,
        location: state.router.location,
    }),
    { loadCocktailDetails }
)(CocktailDetails);
