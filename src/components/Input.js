import React, { Component } from "react";
import {
  View,
  Picker,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../colors";
import CusText from "./CusText";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Styles = {
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  input: {
    label: {
      fontSize: 20,
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    field: {
      flex: 1,
      minHeight: 40,
      color: Colors.blue,
      paddingHorizontal: 20,
      fontSize: 18,
      textAlign: "right"
    },
    icon: {
      paddingLeft: 10
    }
  }
};

class Input extends Component {
  state = {
    value: "",
    selectedValue: "",
    modal: false
  };

  render() {
    const borderStyle = {
      borderColor: this.props.error ? Colors.red : "transparent"
    };
    const {
      containerStyles,
      inputStyles,
      inputWrapperStyles,
      labelStyles,
      type,
      data,
      placeholder
    } = this.props;
    if (type === "picker") {
      return (
        <View
          style={[
            { flex: 1, alignItems: "flex-end", justifyContent: "flex-end" },
            containerStyles
          ]}
        >
          {this.props.label && (
            <CusText style={Styles.input.label}>{this.props.label}</CusText>
          )}
          <TouchableOpacity
            onPress={() => this.setState({ modal: true })}
            style={[
              Styles.row,
              { paddingHorizontal: 15, paddingVertical: 10 },
              borderStyle,
              inputWrapperStyles
            ]}
          >
            <CusText
              style={{
                color: this.state.selectedValue ? Colors.blue : Colors.grey
              }}
            >
              {this.state.selectedValue || placeholder}
            </CusText>
            {this.props.icon && (
              <FontAwesome5
                name={this.props.icon}
                size={18}
                color={
                  this.props.iconColor ? this.props.iconColor : Colors.grey
                }
                style={Styles.input.icon}
              />
            )}
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0, .2)" }}>
              <TouchableWithoutFeedback
                style={{ flex: 1, zIndex: 10 }}
                onPress={() => this.setState({ modal: false })}
              >
                <View
                  style={{
                    height: 250,
                    backgroundColor: "#fff",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottomColor: Colors.darkGrey,
                      borderBottomWidth: 1
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          modal: false
                        });
                      }}
                      style={{ paddingVertical: 20, paddingHorizontal: 25 }}
                    >
                      <CusText>Cancel</CusText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          modal: false,
                          selectedValue: this.state.value
                        });
                        if (typeof this.props.getData === "function") {
                          this.props.getData({
                            value: this.state.value,
                            id: this.props.id
                          });
                        }
                      }}
                      style={{ paddingVertical: 20, paddingHorizontal: 25 }}
                    >
                      <CusText>Confirm</CusText>
                    </TouchableOpacity>
                  </View>
                  <Picker
                    defaultValue={null}
                    selectedValue={this.state.value}
                    onValueChange={(val, itemIndex) => {
                      this.setState({
                        value: val
                      });
                    }}
                    itemStyle={{ fontSize: 20 }}
                  >
                    {data.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item.label}
                          value={item.label}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Modal>
        </View>
      );
    }
    if (type === "textarea") {
      return (
        <View style={[{ flex: 1 }, containerStyles]}>
          <View style={[Styles.row, borderStyle, inputWrapperStyles]}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[Styles.input.field, inputStyles]}
              {...this.props}
              onChangeText={val => {
                if (typeof this.props.getData === "function") {
                  this.props.getData({ value: val, id: this.props.id });
                }
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View
        style={[
          { flex: 1, alignItems: "flex-end", justifyContent: "flex-end" },
          containerStyles
        ]}
      >
        {this.props.label && (
          <CusText style={Styles.input.label}>{this.props.label}</CusText>
        )}
        <View style={[Styles.row, borderStyle, inputWrapperStyles]}>
          <TextInput
            underlineColorAndroid="transparent"
            style={[Styles.input.field, inputStyles]}
            {...this.props}
            onChangeText={val => {
              if (typeof this.props.getData === "function") {
                this.props.getData({ value: val, id: this.props.id });
              }
            }}
          />
          {this.props.icon && (
            <Ionicons
              name={this.props.icon}
              size={25}
              color={this.props.iconColor ? this.props.iconColor : Colors.grey}
              style={Styles.input.icon}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Input;
