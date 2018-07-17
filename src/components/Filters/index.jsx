import React, { Component } from "react";
import Subheader from "../common/Subheader";
import Button from "../common/Button";
import Tag from "../Tag";
import "./Filters.css";

class Filters extends Component {
    state = {};

    loadItems = () => {
        this.setState(data);
    };

    renderItems = () => {
        if (this.state.items === undefined) {
            return null;
        }
        return (
            <div className="filters__list">
                {this.state.items.map(item => (
                    <div
                        className="filters__item"
                        key={`${item.type}_${item.title}`}
                    >
                        <Tag type={item.type}>{item.title}</Tag>
                    </div>
                ))}
            </div>
        );
    };

    render() {
        return (
            <div className="filters">
                <div className="filters__header">
                    <Subheader>Filters</Subheader>
                    <div className="filters__button">
                        <Button stretched onClick={this.loadItems}>
                            {this.state.items ? "Edit" : "Add"}
                        </Button>
                    </div>
                </div>
                {this.renderItems()}
            </div>
        );
    }
}

export default Filters;

let data = {
    items: [
        {
            title: "Ordinary drink",
            type: 0,
        },
        {
            title: "Cocktail",
            type: 0,
        },
        {
            title: "Highball glass",
            type: 1,
        },
        {
            title: "Collins glass",
            type: 1,
        },
        {
            title: "Old-fashioned glass",
            type: 1,
        },
        {
            title: "Alcoholic",
            type: 2,
        },
        {
            title: "Optional alcohol",
            type: 2,
        },
        {
            title: "Light rum",
            type: 3,
        },
        {
            title: "Strawberry schnappsStrawberry schnappsStrawberry schnapps",
            type: 3,
        },
        {
            title: "Scotch",
            type: 3,
        },
    ],
    types: {
        0: "Categories",
        1: "Glass",
        2: "Alcoholic",
        3: "Ingridients",
    },
};
