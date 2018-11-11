import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "../Summary";
import Subheader from "../../common/Subheader";
import Title from "../../common/Title";
import IngredientsList from "../IngredientsList";
import Picture from "../../common/Picture";
import Button from "../../common/Button";

import "./CocktailData.css";

class CocktailData extends Component {
    static propTypes = {
        value: PropTypes.shape({
            strDrinkThumb: PropTypes.string.isRequired,
            strDrink: PropTypes.string.isRequired,
            strInstructions: PropTypes.string.isRequired,
        }),
        favorite: PropTypes.bool.isRequired,
        toggleFavorite: PropTypes.func.isRequired,
    };

    renderHeader = () => {
        return (
            <div className="cocktail-data__header">
                <div className="cocktail-data__picture-wrapper">
                    <div className="cocktail-data__picture">
                        <Picture
                            key={this.props.value.strDrinkThumb}
                            source={this.props.value.strDrinkThumb}
                        />
                    </div>
                </div>

                <div className="cocktail-data__main-data">
                    <Subheader> {this.props.value.strDrink}</Subheader>
                    <div className="cocktail-data__section cocktail-data__section_summary">
                        <div className="cocktail-data__title">
                            <Title>Summary</Title>
                        </div>
                        <Summary value={this.props.value} />
                    </div>

                    <div className="cocktail-data__favorites">
                        <Button onClick={this.props.toggleFavorite} stretched>
                            {this.props.favorite
                                ? "Remove from favorites"
                                : "Add to favorites"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        if (!this.props.value) {
            return null;
        }
        return (
            <div className="cocktail-data">
                {this.renderHeader()}

                <div className="cocktail-data__section">
                    <div className="cocktail-data__title">
                        <Title>Instructions</Title>
                    </div>
                    {this.props.value.strInstructions}
                </div>

                <div className="cocktail-data__section">
                    <div className="cocktail-data__title">
                        <Title>Ingredients</Title>
                    </div>
                    <IngredientsList value={this.props.value} />
                </div>
            </div>
        );
    }
}

export default CocktailData;
