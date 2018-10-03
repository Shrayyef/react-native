import React from "react";
import { View } from "react-native";
import Colors from "../colors";

const ListItem = props => {
  return (
    <View
      style={[
        {
          paddingHorizontal: 10,
          flexDirection: "row",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: Colors.darkGrey,
          marginLeft: 10,
          alignItems: "center"
        },
        props.style
      ]}
    >
      {props.children}
    </View>
  );
};

export default ListItem;
