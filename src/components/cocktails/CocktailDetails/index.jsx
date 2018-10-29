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
                <div
                    style={{
                        background: "red",
                        width: "100%",
                        height: "140px",
                        flex: "1 0 auto",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        height: "calc(100% - 140px)",
                    }}
                >
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
