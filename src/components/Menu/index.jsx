import React, { Component } from "react";
import { connect } from "react-redux";

import MenuLink from "../common/MenuLink";
import menuItems from "../../constants/menu";
import locations from "../../constants/locations";

import "./Menu.css";

class Menu extends Component {
    state = {
        items: [
            {
                name: menuItems.search,
                location: locations.search,
            },
            {
                name: menuItems.favorites,
                location: locations.favorites,
            },
            {
                name: menuItems.random,
                location: locations.random,
            },
            {
                name: menuItems.ingridients,
                location: locations.ingridients,
            },
        ],
    };

    render() {
        return (
            <div className="menu">
                {this.state.items.map((item, index) => (
                    <div className="menu__item" key={index}>
                        <MenuLink
                            selected={item.location === this.props.location}
                            to={item.location}
                        >
                            {item.name}
                        </MenuLink>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(state => ({
    location: state.router.location.pathname,
}))(Menu);
