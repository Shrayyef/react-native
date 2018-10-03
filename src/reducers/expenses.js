const initialState = {
  expenses: []
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return Object.assign({}, state, state.expenses.push(action.expense));
    default:
      return state;
  }
}
