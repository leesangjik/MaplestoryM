import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const BgImg = styled.Image``;
const Title = styled.Text``;
const HSeparator = styled.View`
  width: 20px;
`;

const MainContainer = styled.View`
  padding: 0px 10px;
`;
const ContainerColumn = styled.View`
  padding: 6px 0;
`;
const TitleBox = styled.View`
  flex-direction: row;
`;
const BoardTitle = styled.Text`
  font-size: 12px;
  color: orange;
  font-weight: 600;
  padding-right: 10px;
`;

const ColumnInfo = styled.View`
  flex-direction: row;
`;
const User = styled.Text`
  padding-right: 10px;
  color: grey;
`;
const CreateDate = styled.Text`
  color: grey;
`;
const ReadCount = styled.Text`
  padding-left: 5px;
  color: grey;
`;
const LikeCount = styled.Text`
  padding-left: 5px;
  color: grey;
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
  const { data } = useQuery(
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

  return !data && !stickyData ? (
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
            autoplayTimeout={4}
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
          <MainTitleBox>
            <MainTitle>주요 소식</MainTitle>
          </MainTitleBox>
        </>
      }
      data={stickyData?.stickyThreads}
      keyExtractor={(item) => item.createDate + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <MainContainer>
          <ContainerColumn>
            <TitleBox>
              <BoardTitle>{"[" + item.boardTitle + "]"}</BoardTitle>
              <Title>
                {item.title.length > 20
                  ? item.title.slice(0, 20) + "..."
                  : item.title}
              </Title>
            </TitleBox>
            <ColumnInfo>
              <User>{item?.user.nickname}</User>
              <CreateDate>{GetDate(item?.createDate)}</CreateDate>
              <ReadCount>
                <Ionicons name="eye-outline" />
                {item.readCount}
              </ReadCount>
              <LikeCount>
                <Ionicons name="heart-outline" />
                {item.likeCount}
              </LikeCount>
            </ColumnInfo>
          </ContainerColumn>
        </MainContainer>
      )}
    ></FlatList>
  );
};

export default Home;
