import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import Loader from "./Loader";
import { useNavigation } from "@react-navigation/native";

const BgImg = styled.Image``;
const BtnImg = styled.TouchableOpacity`
  flex: 1;
`;

const Slide = ({ imageUrl, fulldata, linkType, linkValue }) => {
  const navigation = useNavigation();
  const goDetail = async () => {
    if (linkType === "THREAD") {
      navigation.navigate("Stack", {
        screen: "BannerDetail",
        params: {
          ...fulldata,
        },
      });
    } else {
      await Linking.openURL(linkValue);
    }
  };
  return fulldata ? (
    <BtnImg onPress={goDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: imageUrl }}
          resizeMode="stretch"
        />
      </View>
    </BtnImg>
  ) : (
    <Loader />
  );
};

export default Slide;
