import React, { Component } from "react";
import MenuContext from "../context/MenuContext";
import SelectableButton from "../common/SelectableButton";
import "./Menu.css";

class Menu extends Component {
    renderItems(menu) {
        return menu.items.map((item, index) => (
            <div className="menu__item" key={index}>
                <SelectableButton
                    selected={menu.selected === index}
                    onClick={() => menu.selectMenuItem(index)}
                >
                    {item}
                </SelectableButton>
            </div>
        ));
    }

    render() {
        return (
            <div className="menu">
                <MenuContext.Consumer>{this.renderItems}</MenuContext.Consumer>
            </div>
        );
    }
}

export default Menu;
