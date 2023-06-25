import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BannerDetail from "../screens/bannerDetail";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen name="BannerDetail" component={BannerDetail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
