import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "qs";

import Picture from "../../common/Picture";
import Name from "../../common/Name";
import Text from "../../common/Text";
import { ingredientImageSmall } from "../../../api/images";
import locations from "../../../constants/locations";

import "./IngredientsList.css";

// api provides data format:
// {
//     "strIngredient1": "some data",
//     ...
//     "strIngredient15": "some data",
//     "strMeasure1": "some data",
//     ...
//     "strMeasure15": "some data",
// }
// so, we have to check type of all 30 object properties
// using PropTypes and skip empty props in render

class IngredientsList extends Component {
    static allData = new Array(15)
        .fill(0)
        .map((item, i) => [`strIngredient${i + 1}`, `strMeasure${i + 1}`]);

    static propTypes = {
        value: PropTypes.shape(
            IngredientsList.allData.reduce((shape, item) => {
                shape[item[0]] = PropTypes.string;
                shape[item[1]] = PropTypes.string;
                return shape;
            }, {})
        ).isRequired,
        parametersCreator: PropTypes.func.isRequired,
    };

    linkCreator = title => {
        return `${locations.ingredientsDetails}?${qs.stringify({
            title,
        })}&${this.props.parametersCreator()}`;
    };

    renderValues = () => {
        return IngredientsList.allData
            .filter(
                item =>
                    this.props.value[item[0]] &&
                    this.props.value[item[0]].length > 0
            )
            .map(item => {
                const [ingredient, measure] = item;
                return (
                    <Link
                        to={this.linkCreator(this.props.value[ingredient])}
                        className="ingredients-list__link"
                        key={ingredient}
                    >
                        <span className="ingredients-list__item">
                            <span className="ingredients-list__picture">
                                <Picture
                                    source={ingredientImageSmall(
                                        this.props.value[ingredient]
                                    )}
                                />
                            </span>
                            <span className="ingredients-list__data">
                                <span className="ingredients-list__text">
                                    <Name>{this.props.value[ingredient]}</Name>
                                </span>
                                <span className="ingredients-list__text">
                                    <Text>{this.props.value[measure]}</Text>
                                </span>
                            </span>
                        </span>
                    </Link>
                );
            });
    };

    render() {
        return <div className="ingredients-list">{this.renderValues()}</div>;
    }
}

export default IngredientsList;
