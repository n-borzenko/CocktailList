import React, { Component } from "react";
import PropTypes from "prop-types";

import Picture from "../../common/Picture";
import Name from "../../common/Name";
import Text from "../../common/Text";
import { ingredientImage } from "../../../api/images";

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

class ingredientsList extends Component {
    static allData = new Array(15)
        .fill(0)
        .map((item, i) => [`strIngredient${i + 1}`, `strMeasure${i + 1}`]);

    static propTypes = {
        value: PropTypes.shape(
            ingredientsList.allData.reduce((shape, item) => {
                shape[item[0]] = PropTypes.string;
                shape[item[1]] = PropTypes.string;
                return shape;
            }, {})
        ).isRequired,
    };

    renderValues = () => {
        return ingredientsList.allData
            .filter(
                item =>
                    this.props.value[item[0]] &&
                    this.props.value[item[0]].length > 0
            )
            .map(item => (
                <div className="ingredients-list__item" key={item[0]}>
                    <div className="ingredients-list__picture">
                        <Picture
                            source={ingredientImage(this.props.value[item[0]])}
                        />
                    </div>
                    <div className="ingredients-list__data">
                        <div className="ingredients-list__text">
                            <Name>{this.props.value[item[0]]}</Name>
                        </div>
                        <div className="ingredients-list__text">
                            <Text>{this.props.value[item[1]]}</Text>
                        </div>
                    </div>
                </div>
            ));
    };

    render() {
        return <div className="ingredients-list">{this.renderValues()}</div>;
    }
}

export default ingredientsList;
