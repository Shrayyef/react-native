import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./src/store";
import AppWithStore from "./src/App";

const App = () => (
  <Provider store={store}>
    <AppWithStore />
  </Provider>
);

export default App;
