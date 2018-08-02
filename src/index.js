import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./store";
import App from "./components/App";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
