import React, { useEffect } from "react";
import styled from "styled-components/native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

const Container = styled.ScrollView`
  flex: 1;
`;

const MainNewsDetail = ({ navigation: { setOptions }, route: { params } }) => {
  const { data } = useQuery(["MaplestoryM", "MainNewsDetail"], () =>
    fetch(
      `https://forum.nexon.com/api/v1/thread/${params.threadId}?alias=maplestorym`
    ).then((response) => response.json())
  );

  useEffect(() => {
    setOptions({
      title: params.title,
    });
  }, []);

  return data ? (
    <Container>
      <AutoHeightWebView
        originWhitelist={["*"]}
        source={{ html: data.content }}
        scalesPageToFit={true}
      />
    </Container>
  ) : (
    <Loader />
  );
};

export default MainNewsDetail;
