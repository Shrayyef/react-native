import Router from "../router";

const initialState = Router.router.getStateForAction(
  Router.router.getActionForPathAndParams("Dashboard")
);

export default function navReducer(state = initialState, action) {
  const nextState = Router.router.getStateForAction(action, state);

  return nextState || state;
}
