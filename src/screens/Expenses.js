import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Modal
} from "react-native";
import CusText from "../components/CusText";
import Card from "../components/Card";
import ListItem from "../components/ListItem";
import Loading from "../components/Loading";
import Input from "../components/Input";
import Colors from "../colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ActionSheet from "react-native-actionsheet";
import DatePicker from "react-native-datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

var self;

class Expenses extends Component {
  static navigationOptions = {
    title: "Expenses",
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => alert("This is a button!")}
          style={{ paddingHorizontal: 10 }}
        >
          <FontAwesome5 name={"filter"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            self.showActionSheet();
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <FontAwesome5 name={"plus"} size={25} color={"#fff"} />
        </TouchableOpacity>
      </View>
    ),
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = {
    addModal: false,
    date: "",
    expense: {},
    loading: false
  };

  getData = data => {
    const { expense } = this.state;
    expense[data.id] = data.value;
    this.setState({ expense });
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  componentDidMount() {
    self = this;
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <StatusBar />
        <View style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
          {!this.props.expenses.length ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}
            >
              <CusText>no data</CusText>
            </View>
          ) : (
            this.props.expenses.map((item, index) => {
              return (
                <Card key={index}>
                  <ListItem style={{ justifyContent: "space-between" }}>
                    <View>
                      <CusText>Date</CusText>
                    </View>
                    <View>
                      <CusText>{item.date}</CusText>
                    </View>
                  </ListItem>
                  <ListItem style={{ justifyContent: "space-between" }}>
                    <View>
                      <CusText>Currency</CusText>
                    </View>
                    <View>
                      <CusText>{`${item.currency_val} ${
                        item.currency
                      }`}</CusText>
                    </View>
                  </ListItem>
                  <ListItem
                    style={{
                      justifyContent: "space-between",
                      borderBottomWidth: 0
                    }}
                  >
                    <View>
                      <CusText>Account</CusText>
                    </View>
                    <View>
                      <CusText>{item.expense_account}</CusText>
                    </View>
                  </ListItem>
                </Card>
              );
            })
          )}
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Record"}
          options={["Expense", "Mileage", "cancel"]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={index => {
            this.handleClick(index);
          }}
        />
        {this.addModal()}
      </SafeAreaView>
    );
  }

  handleClick = index => {
    if (index === 1) {
      Alert.alert(
        "Error",
        "Ypu will have to configure your mileage preferences before you will be anle to add mileage expense. Please use our web application to configure your mileage preference"
      );
    } else if (index === 0) {
      this.setState({ addModal: true });
    }
  };

  addModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.addModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ backgroundColor: Colors.lightGrey, flex: 1 }}>
          <View
            style={{
              paddingTop: 22,
              backgroundColor: Colors.blue,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.setState({ addModal: false })}
              >
                <CusText style={{ color: Colors.white, fontSize: 20 }}>
                  back
                </CusText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CusText
                style={{
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: "bold"
                }}
              >
                Add Expense
              </CusText>
            </View>
            <View>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  this.setState({ loading: true });
                  let savedData = Object.assign({}, this.state.expense);
                  savedData.date = this.state.date;
                  this.props.dispatchAddExpense(savedData);
                  setTimeout(() => {
                    this.setState({ loading: false, addModal: false });
                  }, 1000);
                }}
              >
                <CusText style={{ color: Colors.white, fontSize: 20 }}>
                  save
                </CusText>
              </TouchableOpacity>
            </View>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <Card>
              <ListItem>
                <View style={{ padding: 5 }}>
                  <CusText style={{ fontSize: 18 }}>Date</CusText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingRight: 15
                    }}
                  >
                    <DatePicker
                      date={this.state.date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="1990-05-01"
                      maxDate="2022-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          color: "red"
                        },
                        dateText: {
                          color: Colors.blue
                        }
                      }}
                      style={{
                        width: "auto",
                        minWidth: 100
                      }}
                      onDateChange={date => {
                        this.setState({ date: date });
                      }}
                    />
                    <FontAwesome5
                      name={"chevron-right"}
                      size={18}
                      color={Colors.grey}
                    />
                  </View>
                </View>
              </ListItem>
              <ListItem>
                <View
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <CusText style={{ fontSize: 18 }}>Expense Account</CusText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Input
                    type="picker"
                    icon="chevron-right"
                    id="expense_account"
                    getData={this.getData}
                    data={[
                      { label: "Hotmail" },
                      { label: "Gmail" },
                      { label: "Yahoo" },
                      { label: "AOL" }
                    ]}
                    placeholder="Tap to Select"
                  />
                </View>
              </ListItem>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <View
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <CusText style={{ fontSize: 18 }}>Paid Through</CusText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Input
                    type="picker"
                    icon="chevron-right"
                    id="paid_through"
                    getData={this.getData}
                    data={[
                      { label: "Bank Account" },
                      { label: "Credit Card" },
                      { label: "cheque" }
                    ]}
                    placeholder="Tap to Select"
                  />
                </View>
              </ListItem>
            </Card>
            <Card>
              <ListItem>
                <View
                  style={{
                    width: 80,
                    borderRightColor: Colors.grey,
                    borderRightWidth: 1,
                    paddingRight: 5,
                    paddingLeft: 10
                  }}
                >
                  <Input
                    type="picker"
                    icon="chevron-right"
                    id="currency"
                    getData={this.getData}
                    data={[{ label: "USD" }, { label: "EUR" }]}
                    placeholder="Cur"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Input
                    id="currency_val"
                    getData={this.getData}
                    placeholder="0.00"
                  />
                </View>
              </ListItem>
              <ListItem>
                <View
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <CusText style={{ fontSize: 18 }}>Vendor</CusText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Input
                    type="picker"
                    icon="chevron-right"
                    id="vendor"
                    getData={this.getData}
                    data={[
                      { label: "Microsoft" },
                      { label: "Apple" },
                      { label: "HP" }
                    ]}
                    placeholder="Tap to Select"
                  />
                </View>
              </ListItem>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <View
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <CusText style={{ fontSize: 18 }}>Tax</CusText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Input
                    type="picker"
                    icon="chevron-right"
                    id="tax"
                    getData={this.getData}
                    data={[
                      { label: "0.5" },
                      { label: "1.0" },
                      { label: "1.5" },
                      { label: "2" }
                    ]}
                    placeholder="Tap to Select"
                  />
                </View>
              </ListItem>
            </Card>
            <Card>
              <ListItem>
                <View
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <CusText style={{ fontSize: 18 }}>Reference#</CusText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Input
                    id="reference"
                    getData={this.getData}
                    placeholder="Tap to Enter"
                  />
                </View>
              </ListItem>
              <ListItem
                style={{
                  borderBottomWidth: 0,
                  flex: 1
                }}
              >
                <View
                  style={{
                    padding: 5,
                    flex: 1
                  }}
                >
                  <CusText style={{ fontSize: 18, marginBottom: 10 }}>
                    Notes
                  </CusText>
                  <View
                    style={{
                      flex: 1
                    }}
                  >
                    <Input
                      type="textarea"
                      multiline={true}
                      id="notes"
                      getData={this.getData}
                      inputStyles={{
                        borderWidth: 1,
                        borderColor: Colors.grey,
                        flex: 1,
                        borderRadius: 10,
                        minHeight: 100,
                        textAlign: "left"
                      }}
                    />
                  </View>
                </View>
              </ListItem>
            </Card>
          </KeyboardAwareScrollView>
        </View>
        {this.state.loading ? (
          <Loading type="full" loading={this.state.loading} />
        ) : (
          <View />
        )}
      </Modal>
    );
  };
}

export default Expenses;
