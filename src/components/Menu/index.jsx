import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMenuItem } from "../../actions/menu";
import SelectableButton from "../common/SelectableButton";
import "./Menu.css";

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                {this.props.items.map((item, index) => (
                    <div className="menu__item" key={index}>
                        <SelectableButton
                            selected={this.props.selected === index}
                            onClick={() => this.props.selectMenuItem(index)}
                        >
                            {item}
                        </SelectableButton>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.menu,
    }),
    { selectMenuItem }
)(Menu);
