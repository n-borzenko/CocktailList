import React, { Component } from "react";

import { createIngredientsTitle } from "../../../helpers/title";

import "./IngredientsContent.css";

class IngredientsContent extends Component {
    render() {
        return <div>IngredientsContent</div>;
    }

    componentDidMount() {
        createIngredientsTitle();
    }
}

export default IngredientsContent;
