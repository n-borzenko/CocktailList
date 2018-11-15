import React, { Component } from "react";

import { createIngredientsTitle } from "../../../helpers/title";

import "./IngredientsContent.css";

class IngredientsContent extends Component {
    componentDidMount() {
        createIngredientsTitle();
    }

    render() {
        return <div>IngredientsContent</div>;
    }
}

export default IngredientsContent;
