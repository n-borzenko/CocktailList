import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Cocktails from "../../cocktails/Cocktails";
import CocktailDetails from "../../cocktails/CocktailDetails";
import { searchTypes } from "../../../constants/search";
import locations from "../../../constants/locations";

import "./SearchContent.css";

class SearchContent extends Component {
    containerRef = React.createRef();
    state = {
        width: 0,
        height: 0,
    };

    resizeHandler = () => {
        this.setState({
            width: this.containerRef.current.clientWidth,
            height: this.containerRef.current.clientHeight,
        });
    };

    componentDidMount() {
        this.resizeHandler();
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    }

    renderCocktailDetails = () => {
        return <CocktailDetails />;
    };

    renderCocktails = () => {
        return (
            <Cocktails
                width={this.state.width}
                height={this.state.height}
                values={this.props.results}
                size={
                    this.props.requestType === searchTypes.filter
                        ? Cocktails.sizes.small
                        : Cocktails.sizes.large
                }
                linkCreator={id => `${locations.searchCocktail}/${id}`}
            />
        );
    };

    render() {
        return (
            <div className="search-content" ref={this.containerRef}>
                <Switch location={this.props.location}>
                    <Route
                        path={locations.searchCocktail}
                        render={this.renderCocktailDetails}
                    />
                    <Route
                        path={locations.search}
                        render={this.renderCocktails}
                    />
                </Switch>
            </div>
        );
    }
}

export default connect(state => ({
    requestType: state.search.request.type,
    results: state.search.response.results,
    location: state.router.location,
}))(SearchContent);
