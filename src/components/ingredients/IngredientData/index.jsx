import React, { Component } from "react";
import PropTypes from "prop-types";

import Subheader from "../../common/Subheader";
import Title from "../../common/Title";
import Picture from "../../common/Picture";
import { ingredientImageLarge } from "../../../api/images";

import "./IngredientData.css";

class IngredientData extends Component {
    static propTypes = {
        value: PropTypes.shape({
            strIngredient: PropTypes.string.isRequired,
            strDescription: PropTypes.string,
            strType: PropTypes.string,
        }),
    };

    renderSection = (title, value) => {
        if (!value || !value.length) {
            return null;
        }
        return (
            <div className="ingredient-data__section">
                <div className="ingredient-data__title">
                    <Title>{title}</Title>
                </div>
                {value}
            </div>
        );
    };

    renderHeader = () => {
        return (
            <div className="ingredient-data__header">
                <div className="ingredient-data__picture-wrapper">
                    <div className="ingredient-data__picture">
                        <Picture
                            key={this.props.value.strIngredient}
                            source={ingredientImageLarge(
                                this.props.value.strIngredient
                            )}
                        />
                    </div>
                </div>

                <div className="ingredient-data__main-data">
                    <Subheader> {this.props.value.strIngredient}</Subheader>
                    {this.renderSection("Type", this.props.value.strType)}
                </div>
            </div>
        );
    };

    render() {
        if (!this.props.value) {
            return null;
        }
        return (
            <div className="ingredient-data">
                {this.renderHeader()}
                {this.renderSection(
                    "Description",
                    this.props.value.strDescription
                )}
            </div>
        );
    }
}

export default IngredientData;
