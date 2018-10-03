import React from "react";
import { View } from "react-native";
import Colors from "../colors";

const Card = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginTop: 40,
        borderTopColor: Colors.darkGrey,
        borderTopWidth: 1,
        borderBottomColor: Colors.darkGrey,
        borderBottomWidth: 1
      }}
    >
      {props.children}
    </View>
  );
};

export default Card;
