import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import navReducer from "./nav";
import appReducer from "./app";
import expenses from "./expenses";

const config = {
  key: "primary",
  storage,
  stateReconciler: autoMergeLevel2
};

const reducer = persistCombineReducers(config, {
  app: appReducer,
  nav: navReducer,
  expenses
});

export default reducer;
