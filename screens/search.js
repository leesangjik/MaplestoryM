import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Loader from "../components/Loader";
import VList from "../components/VList";
import { GetDate } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

const DataContainer = styled.FlatList`
  padding: 5px 0;
`;
const SearchBar = styled.TextInput`
  background-color: white;
  width: 95%;
  margin: 15px auto;
  padding: 10px 15px;
  border-radius: 15px;
`;
const BtnBox = styled.View`
  flex-direction: row;
  align-self: center;
  padding: 15px 0;
`;

const Btn = styled.TouchableOpacity``;

const Search = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const searchData = useQuery(
    ["MaplesotryM", "search"],
    () =>
      fetch(
        `https://forum.nexon.com/api/v1/community/179/threads?alias=maplestorym&pageNo=${page}&paginationType=PAGING&pageSize=15&blockSize=5&searchKeywordType=THREAD_TITLE_AND_CONTENT&keywords=${query}`
      ).then((response) => response.json()),
    {
      enabled: false,
    }
  );

  const onChangeText = (event) => setQuery(event);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchData.refetch();
  };

  const nextPage = () => {
    if (searchData.data.totalPages == 1 || page == searchData.data.totalPages) {
      Alert.alert("마지막 페이지 입니다.");
    } else if (page < searchData.data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (searchData.data.totalPages == 1 || page == 1) {
      Alert.alert("첫 페이지 입니다.");
    } else if (page < searchData.data.totalPages) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchData.refetch();
    }
  }, [page]);

  return (
    <DataContainer
      ListHeaderComponent={
        <>
          <SearchBar
            placeholder="검색"
            returnKeyType="search"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
          />
          {searchData.isFetching ? <Loader /> : null}
        </>
      }
      ListFooterComponent={
        <>
          {searchData?.data ? (
            <BtnBox>
              <Btn onPress={prevPage}>
                <Ionicons
                  style={{ paddingHorizontal: 15 }}
                  name="arrow-back-circle-outline"
                  size={36}
                  color="grey"
                />
              </Btn>
              <Btn onPress={nextPage}>
                <Ionicons
                  style={{ paddingHorizontal: 15 }}
                  name="arrow-forward-circle-outline"
                  size={36}
                  color="grey"
                />
              </Btn>
            </BtnBox>
          ) : null}
        </>
      }
      data={searchData?.data?.threads || ""}
      keyExtractor={(item) => item.createDate + ""}
      renderItem={({ item }) =>
        (
          <VList
            boardTitle="수정예정"
            title={item.title}
            nickname={item.user.nickname}
            createDate={GetDate(item.createDate)}
            readCount={item.readCount}
            likeCount={item.likeCount}
            fulldata={item}
          />
        ) || ""
      }
    ></DataContainer>
  );
};

export default Search;
