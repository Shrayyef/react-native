import React from "react";
import { View, ActivityIndicator } from "react-native";
import CusText from "./CusText";
import Colors from "../colors";

const Loading = props => {
  if (props.type === "full") {
    return (
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "transparent",
            zIndex: 99999999,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0, .7)"
          },
          props.style
        ]}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0, .5)",
            padding: 30,
            borderRadius: 5
          }}
        >
          <ActivityIndicator
            hidesWhenStopped={true}
            animating={props.loading}
            size="large"
            color={Colors.lighterBlue}
          />
          {props.text ? (
            <CusText style={{ marginTop: 10, fontSize: 16, color: "#fff" }}>
              {props.text}
            </CusText>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
  return (
    <View style={[{ paddingVertical: 15 }, props.style]}>
      <ActivityIndicator
        hidesWhenStopped={true}
        animating={props.loading}
        size="large"
        color={Colors.lighterBlue}
      />
    </View>
  );
};

export default Loading;
