import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import VList from "../components/VList";

const HSeparator = styled.View`
  width: 20px;
`;

const MainTitleBox = styled.View``;
const MainTitle = styled.Text`
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const GetDate = (item) => {
  var timeStamp = item * 1000;
  var date = new Date(timeStamp);
  var year = date.getFullYear().toString();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "." + month + "." + day;
};

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["MaplestoryM", "BannerImg"],
    async () =>
      await fetch(
        "https://forum.nexon.com/api/v1/community/maplestorym?alias=maplestorym&countryCode=kr"
      ).then((response) => response.json())
  );

  const { data: stickyData } = useQuery(
    ["MaplestoryM", "stickyData"],
    async () =>
      await fetch(
        "https://forum.nexon.com/api/v1/community/179/stickyThreads?alias=maplestorym&pageSize=20"
      ).then((response) => response.json())
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["MaplestoryM"]);
    setRefreshing(false);
  };

  return !data && !stickyData ? (
    <Loader />
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
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
            autoplayTimeout={4}
            showsButtons={false}
            showsPagination={false}
          >
            {data?.communityHome?.webPlace?.mobileBanners
              ? data?.communityHome?.webPlace?.mobileBanners.map((img) => (
                  <Slide
                    key={img.createDate}
                    imageUrl={img.webImageUrl}
                    fulldata={img}
                  />
                ))
              : null}
          </Swiper>
          <MainTitleBox>
            <MainTitle>주요 소식</MainTitle>
          </MainTitleBox>
        </>
      }
      data={stickyData?.stickyThreads}
      keyExtractor={(item) => item.createDate + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <VList
          boardTitle={item.boardTitle}
          title={item.title}
          nickname={item?.user.nickname || ""}
          createDate={GetDate(item?.createDate)}
          readCount={item.readCount}
          likeCount={item.likeCount}
          fulldata={item}
        />
      )}
    ></FlatList>
  );
};

export default Home;
