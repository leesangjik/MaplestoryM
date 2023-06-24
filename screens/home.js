import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import styled from "styled-components/native";

const BgImg = styled.Image``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = () => {
  const { data } = useQuery(["MaplestoryM", "BannerImg"], () =>
    fetch(
      "https://forum.nexon.com/api/v1/community/maplestorym?alias=maplestorym&countryCode=kr"
    ).then((response) => response.json())
  );

  return !data ? (
    <Loader />
  ) : (
    <FlatList
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 3.5,
              marginBottom: 40,
            }}
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
          >
            {data?.communityHome?.webPlace?.mobileBanners
              ? data?.communityHome?.webPlace?.mobileBanners.map(
                  (img, index) => (
                    <View style={{ flex: 1 }} key={index}>
                      <BgImg
                        style={StyleSheet.absoluteFill}
                        key={img.createDate}
                        source={{ uri: img.webImageUrl }}
                        resizeMode="stretch"
                      />
                    </View>
                  )
                )
              : null}
          </Swiper>
        </>
      }
    ></FlatList>
  );
};

export default Home;
