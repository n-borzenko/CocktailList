import React, { Component } from "react";

import { createAboutTitle } from "../../../helpers/title";

import "./AboutContent.css";

class AboutContent extends Component {
    componentDidMount() {
        createAboutTitle();
    }

    render() {
        return (
            <div>
                <p>
                    All data
                    <ul>
                        <li>cocktails recipes</li>
                        <li>cocktails images</li>
                        <li>ingredients images and descriptions</li>
                    </ul>
                    is provided by{" "}
                    <a href="https://www.thecocktaildb.com/">TheCocktailDB</a>.
                </p>
                <p>
                    Background images are blured versions of images from{" "}
                    <a href="https://pixabay.com">Pixabay</a>
                </p>
                <ul>
                    <li>
                        <a href="https://pixabay.com/ru/%D1%87%D0%B0%D1%88%D0%BA%D0%B8-%D0%B1%D0%B0%D1%80-%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BA-%D0%BA%D0%BE%D0%BA%D1%82%D0%B5%D0%B9%D0%BB%D1%8C-2660966/">
                            Search background
                        </a>
                    </li>
                    <li>
                        <a href="https://pixabay.com/ru/%D0%B0%D0%BB%D0%BA%D0%BE%D0%B3%D0%BE%D0%BB%D1%8C-%D0%BF%D0%B8%D1%82%D1%8C-%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%BE-%D0%B1%D0%B0%D1%80-3194824/">
                            Favorites background
                        </a>
                    </li>
                    <li>
                        <a href="https://pixabay.com/ru/%D0%BA%D0%BE%D0%BA%D1%82%D0%B5%D0%B9%D0%BB%D1%8C-%D0%B1%D0%B0%D1%80-%D0%BD%D0%BE%D1%87%D0%BD%D0%B0%D1%8F-%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C-icee-3327242/">
                            Random background
                        </a>
                    </li>
                    <li>
                        <a href="https://pixabay.com/ru/%D0%BB%D0%B8%D0%BC%D0%BE%D0%BD%D0%B0%D0%B4-%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BA-%D1%86%D0%B8%D1%82%D1%80%D1%83%D1%81%D0%BE%D0%B2%D1%8B%D0%B5-%D1%85%D0%BE%D0%BB%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9-3468107/">
                            Ingredients background
                        </a>
                    </li>
                    <li>
                        <a href="https://pixabay.com/ru/%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B2%D0%B8%D0%BD%D0%BE-%D1%88%D0%B0%D0%BC%D0%BF%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-1964458/">
                            About background
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default AboutContent;
