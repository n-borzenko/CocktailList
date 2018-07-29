import React, { Component } from "react";

const SearchContext = React.createContext();

const SEARCH_DELAY = 300;

class SearchContextProvider extends Component {
    static items = [
        { id: 0, name: "qew" },
        { id: 1, name: "ololo" },
        { id: 2, name: "qwertyqwerty" },
        { id: 3, name: "1234qwe" },
        { id: 4, name: "oleroteor6o" },
        { id: 5, name: "oleroteo5ro" },
        { id: 6, name: "olerote4o" },
        { id: 7, name: "olerot3eoro" },
        { id: 8, name: "olero2teoro" },
    ];

    startSearch = (text, startImmediately = true) => {
        clearTimeout(this.timer);
        let value = text ? text : null;
        if (startImmediately) {
            this.implementSearch(text);
        } else {
            this.timer = setTimeout(
                () => this.implementSearch(text),
                SEARCH_DELAY
            );
        }
    };

    timer = null;
    state = {
        text: null,
        results: null,
        updateText: this.startSearch,
    };

    implementSearch = text => {
        console.log(`searching... ${text}`);
        this.setState({
            text: text,
            results: SearchContextProvider.items.filter(item =>
                item.name.startsWith(text)
            ),
        });
    };

    render() {
        return (
            <SearchContext.Provider value={this.state}>
                {this.props.children}
            </SearchContext.Provider>
        );
    }
}

export default {
    Provider: SearchContextProvider,
    Consumer: SearchContext.Consumer,
};
