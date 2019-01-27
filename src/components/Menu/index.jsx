import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MenuLink from "../common/MenuLink";
import menuItems from "../../constants/menu";
import locations from "../../constants/locations";
import { stateToSearchURL } from "../../actions/search";
import { stateToRandomURL } from "../../actions/random";

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
                location: () => stateToRandomURL(this.props.random),
            },
            {
                name: menuItems.ingredients,
                location: () => locations.ingredients,
            },
            {
                name: menuItems.about,
                location: () => locations.about,
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
                            location={this.props.location}
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
    random: state.random,
    filters: state.filters,
    location: state.router.location,
}))(Menu);
