import React, { Component } from "react";

import { createRandomTitle } from "../../../helpers/title";

import "./RandomContent.css";

class RandomContent extends Component {
    componentDidMount() {
        createRandomTitle();
    }

    render() {
        return <div>RandomContent</div>;
    }
}

export default RandomContent;
