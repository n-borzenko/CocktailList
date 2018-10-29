import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../../common/Card";
import CocktailData from "../CocktailData";
import { loadCocktailDetails } from "../../../actions/cocktail";

import "./CocktailDetails.css";

class CocktailDetails extends Component {
    componentDidMount() {
        const id = this.props.location.pathname.substring(
            this.props.location.pathname.lastIndexOf("/") + 1
        );
        this.props.loadCocktailDetails(id);
    }

    render() {
        return (
            <div className="cocktail-details">
                <div className="cocktail-details__card">
                    <Card>
                        <CocktailData value={this.props.value} />
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        value: state.cocktail.value,
        location: state.router.location,
    }),
    { loadCocktailDetails }
)(CocktailDetails);
