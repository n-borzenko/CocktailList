import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Picture from "../../common/Picture";
import Title from "../../common/Title";
import { ingredientImageMeduim } from "../../../api/images";

import "./Ingredient.css";

class Ingredient extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
    };

    render() {
        return (
            <Link to={this.props.to} className="ingredient-link">
                <span className="ingredient">
                    <span className="ingredient__content">
                        <span className="ingredient__picture">
                            <Picture
                                size={Picture.sizes.medium}
                                source={ingredientImageMeduim(this.props.value)}
                            />
                        </span>
                        <span className="ingredient__info">
                            <span className="ingredient__title">
                                <Title truncate>{this.props.value}</Title>
                            </span>
                        </span>
                    </span>
                </span>
            </Link>
        );
    }
}

export default Ingredient;
