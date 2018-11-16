import React, { Component } from "react";

import { createRandomTitle } from "../../../helpers/title";
import BackgroundImage from "../../common/BackgroundImage";

import "./RandomContent.css";

class RandomContent extends Component {
    componentDidMount() {
        createRandomTitle();
    }

    render() {
        return (
            <div className="random-content">
                <div className="random-content__cards">
                    <div className="random-content__card">
                        <div className="random-content__background" />
                        <div className="random-content__content">
                            dfvjksdsdf
                            <br />
                            vjdfksbjvlsdf
                            <br />
                            sdfjvndlkf
                            <br />
                            12342
                            <br />
                            vjdfksbjvlsdf
                            <br />
                            sdfjvndlkf
                            <br />
                            12342
                            <br />
                            vjdfksbjvlsdf
                            <br />
                            sdfjvndlkf
                            <br />
                            12342
                            <br />
                            vjdfksbjvlsdf
                            <br />
                            sdfjvndlkf
                            <br />
                            12342
                        </div>
                    </div>
                    <div className="random-content__card random-content__card_animated">
                        <div className="random-content__background" />
                        <div className="random-content__content">
                            qvwervewrv
                            <br />
                            jdcghuhasdvjher
                            <br />
                            jkshdbkjashvbkjqvwervewrv
                            <br />
                            jdcghuhasdvjher
                            <br />
                            jkshdbkjashvbkj
                            <br />
                            jdcghuhasdvjher
                            <br />
                            jkshdbkjashvbkjqvwervewrv
                            <br />
                            jdcghuhasdvjher
                            <br />
                            jkshdbkjashvbkj
                            <br />
                            jdcghuhasdvjher
                            <br />
                            jkshdbkjashvbkjqvwervewrv
                            <br />
                            jdcghuhasdvjher
                            <br />
                            jkshdbkjashvbkj
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RandomContent;
