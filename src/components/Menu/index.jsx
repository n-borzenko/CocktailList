import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MenuLink from "../common/MenuLink";
import menuItems from "../../constants/menu";
import { locations } from "../../constants/locations";
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
                isActive: match =>
                    match ||
                    locations.search === this.props.lastMenuPathname ||
                    this.props.lastMenuPathname === null,
            },
            {
                name: menuItems.favorites,
                location: () => locations.favorites,
                isActive: match =>
                    match ||
                    locations.favorites === this.props.lastMenuPathname,
            },
            {
                name: menuItems.random,
                location: () => locations.random,
                isActive: match =>
                    match || locations.random === this.props.lastMenuPathname,
            },
            {
                name: menuItems.ingredients,
                location: () => locations.ingredients,
                isActive: match =>
                    match ||
                    locations.ingredients === this.props.lastMenuPathname,
            },
        ],
    };

    isActive = itemLocation => {
        console.log(itemLocation);
        return match =>
            match || itemLocation.startsWith(this.props.lastMenuPathname);
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
                            location={this.props.location}
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
    lastMenuPathname: state.locations.lastMenuPathname,
}))(Menu);
