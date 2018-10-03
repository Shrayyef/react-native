import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from "react-native";
import CusText from "../components/CusText";
import Colors from "../colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Swiper from "react-native-swiper";
import {
  LineChart,
  BarChart,
  PieChart,
  YAxis,
  Grid,
  XAxis
} from "react-native-svg-charts";

import * as shape from "d3-shape";
import { Circle, G } from "react-native-svg";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <CusText style={{ color: "#fff", fontWeight: "bold" }}>Dashboard</CusText>
    ),
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => alert("This is a button!")}
        style={{ paddingHorizontal: 15 }}
      >
        <FontAwesome5 name={"folder"} size={25} color={"#fff"} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => alert("This is a button!")}
        style={{ paddingHorizontal: 15 }}
      >
        <FontAwesome5 name={"bell"} size={25} color={"#fff"} />
      </TouchableOpacity>
    ),
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  render() {
    const data = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const contentInset = { top: 20, bottom: 20, left: 5, right: 5 };

    const Decorator = ({ x, y, data }) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={2}
          stroke={Colors.blue}
          fill={Colors.blue}
        />
      ));
    };

    const barData = [
      {
        data: [{ value: 0 }, { value: 0 }, { value: 650 }],
        svg: {
          fill: "rgb(134, 65, 244)"
        }
      },
      {
        data: [{ value: 0 }, { value: 0 }, { value: 234 }, { value: 4 }]
      }
    ];

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <StatusBar />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <Swiper showsButtons={false} loop={false}>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "column",
                paddingBottom: 50
              }}
            >
              <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <CusText style={{ fontSize: 25, marginBottom: 10 }}>
                  Cash Flow
                </CusText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <View>
                    <CusText style={{ color: Colors.blue }}>
                      Ending Balance
                    </CusText>
                    <CusText style={{ color: Colors.blue }}>Sep 2018</CusText>
                  </View>
                  <View>
                    <CusText style={{ color: Colors.barGrey }}>
                      $10,000.00
                    </CusText>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 300,
                  flexDirection: "column",
                  paddingHorizontal: 30
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <YAxis
                    contentInset={contentInset}
                    data={data}
                    svg={{
                      fill: "grey",
                      fontSize: 13
                    }}
                    numberOfTicks={11}
                    min={-1}
                    max={10}
                    yAccessor={({ index }) => index}
                    formatLabel={value => {
                      return `${value.toFixed(1)} k`;
                    }}
                  />
                  <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: Colors.blue, strokeWidth: 2 }}
                    contentInset={contentInset}
                    yMin={-1}
                    yMax={10}
                  >
                    <Grid />
                    <Decorator />
                  </LineChart>
                </View>
                <View>
                  <XAxis
                    data={data}
                    contentInset={{ left: 60, right: 20 }}
                    svg={{
                      fill: "grey",
                      fontSize: 14
                    }}
                    numberOfTicks={5}
                    formatLabel={value => {
                      return `${months[value]}`;
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  margin: 20,
                  borderColor: Colors.darkGrey,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15
                }}
              >
                <CusText style={{ color: Colors.blue }}>
                  Cash as on 14 Sep 2018
                </CusText>
                <CusText style={{ color: Colors.barGrey }}>$10,000.00</CusText>
              </View>
            </ScrollView>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "column",
                paddingBottom: 50
              }}
            >
              <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <CusText style={{ fontSize: 25, marginBottom: 10 }}>
                  Income & Expense
                </CusText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <View>
                    <CusText style={{ color: Colors.green, fontSize: 17 }}>
                      Income for Sep 2018
                    </CusText>
                    <CusText style={{ color: Colors.yellow, fontSize: 17 }}>
                      Expense for Sep 2018
                    </CusText>
                  </View>
                  <View>
                    <CusText style={{ color: Colors.barGrey }}>
                      $10,000.00
                    </CusText>
                    <CusText style={{ color: Colors.barGrey }}>
                      $10,000.00
                    </CusText>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 300,
                  flexDirection: "column",
                  paddingHorizontal: 30
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <YAxis
                    contentInset={contentInset}
                    data={barData}
                    svg={{
                      fill: "grey",
                      fontSize: 13
                    }}
                    numberOfTicks={8}
                    min={0}
                    max={700}
                    formatLabel={value => {
                      return `${value.toFixed(1)}`;
                    }}
                  />
                  <BarChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={barData}
                    svg={{
                      fill: Colors.blue
                    }}
                    xAccessor={({ item }) => {
                      return item.date;
                    }}
                    yAccessor={({ item }) => item.value}
                    contentInset={contentInset}
                    yMin={0}
                    yMax={700}
                  >
                    <Grid />
                  </BarChart>
                </View>
                <View>
                  <XAxis
                    data={barData}
                    contentInset={{ left: 60, right: 20 }}
                    svg={{
                      fill: "grey",
                      fontSize: 14
                    }}
                    numberOfTicks={5}
                    min={0}
                    max={6}
                    formatLabel={index => {
                      return `${months[index]}`;
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  margin: 20,
                  borderColor: Colors.darkGrey,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingVertical: 5
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: Colors.darkGrey,
                    padding: 15,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CusText
                    style={{
                      color: Colors.green,
                      fontSize: 17,
                      marginBottom: 5
                    }}
                  >
                    Total Income
                  </CusText>
                  <CusText style={{ color: Colors.barGrey }}>
                    $10,000.00
                  </CusText>
                </View>
                <View
                  style={{
                    padding: 15,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CusText
                    style={{
                      color: Colors.yellow,
                      fontSize: 17,
                      marginBottom: 5
                    }}
                  >
                    Total Expense
                  </CusText>
                  <CusText style={{ color: Colors.barGrey }}>
                    $10,000.00
                  </CusText>
                </View>
              </View>
            </ScrollView>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "column",
                paddingBottom: 50
              }}
            >
              <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <CusText style={{ fontSize: 25, marginBottom: 10 }}>
                  Total Recievables
                </CusText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <View>
                    <CusText style={{ color: Colors.green }}>Current</CusText>
                  </View>
                  <View>
                    <CusText style={{ color: Colors.darkGrey }}>$0.00</CusText>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 300,
                  flexDirection: "column",
                  paddingHorizontal: 30
                }}
              >
                <PieChart
                  style={{ height: 300 }}
                  innerRadius="0%"
                  data={[
                    {
                      value: 100,
                      svg: {
                        fill: Colors.orange,
                        onPress: () => console.log("press", index)
                      },
                      key: `pie-${Math.random()}`
                    }
                  ]}
                />
              </View>
              <View
                style={{
                  margin: 20,
                  borderColor: Colors.darkGrey,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingVertical: 5
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: Colors.darkGrey,
                    padding: 15,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CusText
                    style={{
                      color: Colors.green,
                      fontSize: 17,
                      marginBottom: 5
                    }}
                  >
                    Current
                  </CusText>
                  <CusText style={{ color: Colors.barGrey }}>$0.00</CusText>
                </View>
                <View
                  style={{
                    padding: 15,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CusText
                    style={{
                      color: Colors.orange,
                      fontSize: 17,
                      marginBottom: 5
                    }}
                  >
                    Overdue
                  </CusText>
                  <CusText style={{ color: Colors.barGrey }}>$650.00</CusText>
                </View>
              </View>
            </ScrollView>
          </Swiper>
        </View>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
