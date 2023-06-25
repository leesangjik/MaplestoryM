import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Loader from "../components/Loader";
import AutoHeightWebView from "react-native-autoheight-webview";

const Container = styled.ScrollView`
  flex: 1;
  padding-left: 10px;
`;

const BannerDetail = ({ navigation: { setOptions }, route: { params } }) => {
  const { data } = useQuery(["MaplestoryM", "BannerDetail"], () =>
    fetch(
      `https://forum.nexon.com/api/v1/thread/${params.linkValue}?alias=maplestorym`
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
        style={{}}
        originWhitelist={["*"]}
        source={{ html: data.content }}
        scalesPageToFit={true}
      />
    </Container>
  ) : (
    <Loader />
  );
};

export default BannerDetail;
