import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Loader from "./Loader";

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

const Title = styled.Text``;

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

const VList = ({
  boardTitle,
  title,
  nickname,
  createDate,
  readCount,
  likeCount,
  fulldata,
}) => {
  return fulldata ? (
    <MainContainer>
      <ContainerColumn>
        <TitleBox>
          <BoardTitle>{"[" + boardTitle + "]"}</BoardTitle>
          <Title>
            {title.length > 20 ? title.slice(0, 20) + "..." : title}
          </Title>
        </TitleBox>
        <ColumnInfo>
          <User>{nickname}</User>
          <CreateDate>{createDate}</CreateDate>
          <ReadCount>
            <Ionicons name="eye-outline" />
            {readCount}
          </ReadCount>
          <LikeCount>
            <Ionicons name="heart-outline" />
            {likeCount}
          </LikeCount>
        </ColumnInfo>
      </ContainerColumn>
    </MainContainer>
  ) : (
    <Loader />
  );
};

export default VList;
