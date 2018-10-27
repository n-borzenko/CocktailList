import React, { Component } from "react";
import PropTypes from "prop-types";

import Text from "../../common/Text";
import Icon from "../../common/Icon";

import "./Summary.css";

class Summary extends Component {
    static propTypes = {
        value: PropTypes.shape({
            strCategory: PropTypes.string,
            strAlcoholic: PropTypes.string,
            strGlass: PropTypes.string,
            strIBA: PropTypes.string,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        const summary = [];
        if (props.value.strCategory) {
            summary.push({
                type: Icon.types.category,
                name: props.value.strCategory,
            });
        }
        if (props.value.strAlcoholic) {
            summary.push({
                type: Icon.types.alcohol,
                name: props.value.strAlcoholic,
            });
        }
        if (props.value.strGlass) {
            summary.push({
                type: Icon.types.glass,
                name: props.value.strGlass,
            });
        }
        if (props.value.strIBA) {
            summary.push({
                type: Icon.types.iba,
                name: props.value.strIBA,
            });
        }
        this.state = { summary };
    }

    render() {
        if (this.state.summary.length === 0) {
            return null;
        }
        return (
            <span className="summary">
                {this.state.summary.map(item => (
                    <span className="summary__item" key={item.type}>
                        <span className="summary__icon">
                            <Icon type={item.type} color={Icon.colors.light} />
                        </span>
                        <Text truncate>{item.name}</Text>
                    </span>
                ))}
            </span>
        );
    }
}

export default Summary;
