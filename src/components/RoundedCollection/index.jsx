import React, { Component } from "react";
import ActionButton from "../common/ActionButton";
import classNames from "classnames";
import "./RoundedCollection.css";

class RoundedCollection extends Component {
    state = {
        items: [
            ...[...Array(26)].map((_, index) =>
                String.fromCharCode(index + "A".charCodeAt(0))
            ),
            ...[...Array(10)].map((_, index) => index.toString()),
        ],
        selected: 0,
    };

    selectItem = index => {
        this.setState({ selected: index });
    };

    renderItems() {
        return this.state.items.map((item, index) => {
            const className = classNames("rounded-collection__item", {
                "rounded-collection__item_selected":
                    this.state.selected === index,
            });
            return (
                <button
                    className={className}
                    onClick={e => this.selectItem(index, e)}
                >
                    {item}
                </button>
            );
        });
    }

    render() {
        return (
            <div className="rounded-collection">
                <div className="rounded-collection__arrow">
                    <ActionButton
                        type={ActionButton.types.arrowLeft}
                        style={ActionButton.styles.light}
                        disabled
                    />
                </div>
                <div className="rounded-collection__items">
                    {this.renderItems()}
                </div>
                <div className="rounded-collection__arrow">
                    <ActionButton
                        type={ActionButton.types.arrowRight}
                        style={ActionButton.styles.light}
                    />
                </div>
            </div>
        );
    }
}

export default RoundedCollection;
