import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import qs from "qs";

import Details from "../../common/Details";
import IngredientData from "../IngredientData";
import { loadIngredientDetails } from "../../../actions/details";
import { createIngredientTitle } from "../../../helpers/title";

class IngredientDetails extends Component {
    static propTypes = {
        getBackURL: PropTypes.func.isRequired,
        results: PropTypes.array.isRequired,
        locationCreator: PropTypes.func.isRequired,
    };

    static defaultProps = {
        results: [],
        locationCreator: () => null,
    };

    state = { left: null, right: null };

    static getDerivedStateFromProps(props) {
        const { location } = props;
        const parameters =
            location && location.search && location.search.length > 1
                ? qs.parse(location.search.substr(1))
                : null;
        const id = parameters && parameters.title ? parameters.title : null;
        return {
            id,
        };
    }

    componentDidMount() {
        this.props.loadIngredientDetails(this.state.id);
        this.createLinks();
        createIngredientTitle(
            this.props.value ? this.props.value.strIngredient : ""
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.loadIngredientDetails(this.state.id);
        }
        if (
            this.props.value !== prevProps.value ||
            this.props.results !== prevProps.results
        ) {
            this.createLinks();
        }
        createIngredientTitle(
            this.props.value ? this.props.value.strIngredient : ""
        );
    }

    createLinks = () => {
        const { results, locationCreator } = this.props;
        const index = results.findIndex(item => item === this.state.id);
        this.setState(state => {
            if (index > 0) {
                return { left: locationCreator(results[index - 1]) };
            }
            return { left: null };
        });
        this.setState(state => {
            if (index < results.length - 1 && index >= 0) {
                return { right: locationCreator(results[index + 1]) };
            }
            return { right: null };
        });
    };

    render() {
        return (
            <Details
                getBackURL={this.props.getBackURL}
                previousURL={this.state.left}
                nextURL={this.state.right}
            >
                <IngredientData value={this.props.value}>njmkol</IngredientData>
            </Details>
        );
    }
}

export default connect(
    state => ({
        value: state.details.current.ingredient,
        location: state.router.location,
    }),
    { loadIngredientDetails }
)(IngredientDetails);
