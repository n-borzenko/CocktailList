import React, { Component } from "react";
import Mode from "../Mode";
import Filters from "../Filters";
import "./Settings.css";

class Settings extends Component {
    render() {
        return (
            <div className="settings">
                <div className="settings__item">
                    <Mode />
                </div>
                <div className="settings__item">
                    <Filters />
                </div>
                {/* <div className="settings__item">
                    <Tag type={1}>fdsf</Tag>
                    <Tag type={0}>fghjkl</Tag>
                    <Tag type={2}>
                        fghjksdfbvsdfb dsbsdbdsl sdfbvsdfbdsbsdbdsl
                    </Tag>
                    <Tag>fghjkdfbdsbl</Tag>
                    <Tag type={3}>f</Tag>
                    <Tag type={2}>fghj2314l</Tag>
                    <Tag>324tvdsrg234g</Tag>
                </div> */}
            </div>
        );
    }
}

export default Settings;
