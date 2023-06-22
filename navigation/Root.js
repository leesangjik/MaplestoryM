import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Nav.Screen name="Tabs" component={Tabs} />
    </Nav.Navigator>
  );
};

export default Root;
