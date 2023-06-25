import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/home";
import Setting from "../screens/setting";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerTitle: "메이플스토리M",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          headerTitle: "설정",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"settings-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
