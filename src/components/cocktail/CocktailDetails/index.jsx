import React, { Component } from "react";
import { connect } from "react-redux";

import ActionButton from "../../common/ActionButton";
import Icon from "../../common/Icon";
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

    renderLeftButton = () => {
        return (
            <ActionButton onClick={() => console.log("left")}>
                <Icon type={Icon.types.arrowLeft} />
            </ActionButton>
        );
    };

    renderRightButton = () => {
        return (
            <ActionButton onClick={() => console.log("right")}>
                <Icon type={Icon.types.arrowRight} />
            </ActionButton>
        );
    };

    renderCloseButton = () => {
        return null;
        // return (
        //     <ActionButton onClick={() => console.log("close")}>
        //         <Icon type={Icon.types.remove} />
        //     </ActionButton>
        // );
    };

    render() {
        return (
            <div className="cocktail-details">
                <div className="cocktail-details__card">
                    <Card
                        renderLeftButton={this.renderLeftButton}
                        renderRightButton={this.renderRightButton}
                        renderCloseButton={this.renderCloseButton}
                    >
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
