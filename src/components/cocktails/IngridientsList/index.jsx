import React, { Component } from "react";
import PropTypes from "prop-types";

import Picture from "../../common/Picture";
import Name from "../../common/Name";
import Text from "../../common/Text";
import { ingridientImage } from "../../../api/constants";

import "./IngridientsList.css";

class IngridientsList extends Component {
    static allData = new Array(15)
        .fill(0)
        .map((item, i) => [`strIngredient${i + 1}`, `strMeasure${i + 1}`]);

    static propTypes = {
        value: PropTypes.shape(
            IngridientsList.allData.reduce((shape, item) => {
                shape[item[0]] = PropTypes.string;
                shape[item[1]] = PropTypes.string;
                return shape;
            }, {})
        ).isRequired,
    };

    renderValues = () => {
        return IngridientsList.allData
            .filter(
                item =>
                    this.props.value[item[0]] &&
                    this.props.value[item[0]].length > 0
            )
            .map(item => (
                <div className="ingridients-list__item" key={item[0]}>
                    <div className="ingridients-list__picture">
                        <Picture
                            source={ingridientImage(this.props.value[item[0]])}
                        />
                    </div>
                    <div className="ingridients-list__data">
                        <div className="ingridients-list__text">
                            <Name truncate>{this.props.value[item[0]]}</Name>
                        </div>
                        <div className="ingridients-list__text">
                            <Text truncate>{this.props.value[item[1]]}</Text>
                        </div>
                    </div>
                </div>
            ));
    };

    render() {
        return <div className="ingridients-list">{this.renderValues()}</div>;
    }
}

export default IngridientsList;
