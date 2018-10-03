import React from "react";
import DashboardContainer from "./containers/Dashboard";
import ExpensesContainer from "./containers/Expenses";
import ContactContainer from "./containers/Contact";
import InvoicesContainer from "./containers/Invoices";
import MoreContainer from "./containers/More";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Colors from "./colors";

const DashboardStack = createStackNavigator({
  Dashboard: DashboardContainer
});

const ExpensesStack = createStackNavigator({
  Expenses: ExpensesContainer
});

const ContactStack = createStackNavigator({
  Contact: ContactContainer
});
const InvoicesStack = createStackNavigator({
  Invoices: InvoicesContainer
});
const MoreStack = createStackNavigator({
  More: MoreContainer
});

const App = createBottomTabNavigator(
  {
    Dashboard: DashboardStack,
    Contact: ContactStack,
    Invoices: InvoicesStack,
    Expenses: ExpensesStack,
    More: MoreStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Dashboard") {
          iconName = `tachometer-alt`;
        } else if (routeName === "Contact") {
          iconName = `user`;
        } else if (routeName === "Invoices") {
          iconName = `file-alt`;
        } else if (routeName === "Expenses") {
          iconName = `folder`;
        } else if (routeName === "More") {
          iconName = `ellipsis-h`;
        }

        if (focused)
          return (
            <FontAwesome5 name={iconName} solid size={25} color={tintColor} />
          );

        return <FontAwesome5 name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.blue,
      inactiveTintColor: Colors.white,
      style: {
        backgroundColor: Colors.barGrey,
        borderWidth: 0
      }
    },
    animationEnabled: true,
    swipeEnabled: true
    // initialRouteName: "Expenses"
  }
);

export default App;
