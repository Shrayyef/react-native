import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import logger from "redux-logger";

import { persistStore } from "redux-persist";

const store = createStore(reducer, applyMiddleware(logger));
persistStore(store, null, () => {
  store.getState(); // if you want to get restoredState
});

export default store;
