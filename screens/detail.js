import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import Loader from "../components/Loader";
import AutoHeightWebView from "react-native-autoheight-webview";
import { Dimensions } from "react-native";

const Container = styled.ScrollView`
  flex: 1;
`;

const { width, height } = Dimensions.get("window");

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(["MaplestoryM", "detail"], () =>
    fetch(
      `https://forum.nexon.com/api/v1/thread/${params.linkValue}?alias=maplestorym`
    ).then((response) => response.json())
  );
  const { data: commentData } = useQuery(["MaplestoryM", "comment"], () =>
    fetch(
      `https://forum.nexon.com/api/v1/thread/${params.linkValue}/commentsV2?alias=maplestorym&paginationType=PAGING&pageSize=100&pageNo=1&blockSize=5`
    ).then((response) => response.json())
  );

  useEffect(() => {
    setOptions({
      title: params.title,
    });
  }, []);

  //console.log(commentData.comments);
  return data ? (
    <Container>
      <AutoHeightWebView
        style={{ marginBottom: 10 }}
        originWhitelist={["*"]}
        source={{ html: data.content }}
        scalesPageToFit={true}
      />
    </Container>
  ) : (
    <Loader />
  );
};

export default Detail;
