import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MenuLink from "../common/MenuLink";
import menuItems from "../../constants/menu";
import locations from "../../constants/locations";
import { stateToSearchURL } from "../../actions/search";

import "./Menu.css";

class Menu extends Component {
    static propTypes = {
        onClick: PropTypes.func,
    };

    state = {
        items: [
            {
                name: menuItems.search,
                location: () => stateToSearchURL(this.props.search.request),
                isActive: (match, location) =>
                    location.pathname.startsWith(locations.search),
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
                        <MenuLink
                            to={item.location()}
                            onClick={this.props.onClick}
                            isActive={item.isActive || null}
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
    search: state.search,
    filters: state.filters,
    location: state.router.location,
}))(Menu);
