import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode provider={store}>
    <App />
  </React.StrictMode>
);
