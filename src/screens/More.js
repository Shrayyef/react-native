import React, { Component } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import CusText from "../components/CusText";
import Colors from "../colors";

class More extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "More",
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <CusText>asd asd asd</CusText>
        </View>
      </SafeAreaView>
    );
  }
}

export default More;
