import { connect } from "react-redux";
import Expenses from "../screens/Expenses";
import { addExpense } from "../actions";

function mapStateToProps(state) {
  return {
    expenses: state.expenses.expenses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchAddExpense: expense => dispatch(addExpense(expense))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expenses);
