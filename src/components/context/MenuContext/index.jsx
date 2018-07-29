import React, { Component } from "react";

const MenuContext = React.createContext();

class MenuContextProvider extends Component {
    state = {
        items: ["Search", "Favorites", "Random", "Ingridients"],
        selected: 0,
        selectMenuItem: index => this.setState({ selected: index }),
    };

    render() {
        return (
            <MenuContext.Provider value={this.state}>
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}

export default {
    Provider: MenuContextProvider,
    Consumer: MenuContext.Consumer,
};
