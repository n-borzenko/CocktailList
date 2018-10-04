import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ActionButton from "../../common/ActionButton";
import AnimatedIcon from "../../common/AnimatedIcon";
import Icon from "../../common/Icon";
import Title from "../../common/Title";
import Filter from "../Filter";
import { filterTypes, filterTitles } from "../../../constants/filters";

import "./FiltersCluster.css";

class FiltersCluster extends Component {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(filterTypes)).isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        selected: PropTypes.string,
        selectFilter: PropTypes.func,
    };

    static defaultProps = {
        type: filterTypes.category,
        values: [],
    };

    state = {
        opened: false,
    };

    toggleCluster = () => {
        this.setState({ opened: !this.state.opened });
    };

    selectFilter = name => {
        this.props.selectFilter(this.props.type, name);
    };

    renderValues = () => {
        return this.props.values.map(item => {
            if (!this.state.opened && this.props.selected !== item) {
                return null;
            }
            return (
                <CSSTransition
                    classNames="filter_fade"
                    key={item}
                    timeout={200}
                >
                    <Filter
                        type={this.props.type}
                        selected={this.props.selected === item}
                        onClick={() => {
                            this.selectFilter(item);
                        }}
                    >
                        {item}
                    </Filter>
                </CSSTransition>
            );
        });
    };

    render() {
        return (
            <div className="filters-cluster">
                <div className="filters-cluster__header">
                    <Title>{filterTitles[this.props.type]}</Title>
                    <div className="filters-cluster__button">
                        <ActionButton
                            style={ActionButton.styles.dark}
                            onClick={this.toggleCluster}
                        >
                            <AnimatedIcon
                                position={
                                    this.state.opened
                                        ? AnimatedIcon.position.up
                                        : AnimatedIcon.position.down
                                }
                            >
                                <Icon type={Icon.types.arrowDown} />
                            </AnimatedIcon>
                        </ActionButton>
                    </div>
                </div>
                <div className="filters-cluster__values">
                    <TransitionGroup component={null}>
                        {this.renderValues()}
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export default FiltersCluster;
