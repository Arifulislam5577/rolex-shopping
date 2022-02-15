import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";
import App from "./App";
import store from "./Redux/Store/store";
import "bootstrap/dist/js/bootstrap.bundle.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
