import React, { Component } from "react";

import { createRandomTitle } from "../../../helpers/title";

import "./RandomContent.css";

class RandomContent extends Component {
    render() {
        return <div>RandomContent</div>;
    }

    componentDidMount() {
        createRandomTitle();
    }
}

export default RandomContent;
