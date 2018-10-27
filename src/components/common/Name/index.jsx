import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Name.css";

function Name({ children, truncate }) {
    const className = classNames("name", {
        name_truncated: truncate,
    });
    return <span className={className}>{children}</span>;
}

Name.propTypes = {
    children: PropTypes.node.isRequired,
    truncate: PropTypes.bool.isRequired,
};

Name.defaultProps = {
    truncate: false,
};

export default Name;
