import React, { Component } from "react";
import { connect } from "react-redux";

import MenuLink from "../common/MenuLink";
import menuItems from "../../constants/menu";
import locations from "../../constants/locations";
import { searchURLFromState } from "../../actions/search";

import "./Menu.css";

class Menu extends Component {
    state = {
        items: [
            {
                name: menuItems.search,
                location: () => searchURLFromState(this.props.search),
            },
            {
                name: menuItems.favorites,
                location: () => locations.favorites,
            },
            {
                name: menuItems.random,
                location: () => locations.random,
            },
            {
                name: menuItems.ingridients,
                location: () => locations.ingridients,
            },
        ],
    };

    render() {
        return (
            <div className="menu">
                {this.state.items.map((item, index) => (
                    <div className="menu__item" key={index}>
                        <MenuLink to={item.location()}>{item.name}</MenuLink>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(state => ({
    search: state.search,
    filters: state.filters,
}))(Menu);
