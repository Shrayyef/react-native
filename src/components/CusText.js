import React from "react";
import { Text } from "react-native";

const CusText = props => (
  <Text {...props} style={[props.style]}>
    {props.children}
  </Text>
);

export default CusText;
