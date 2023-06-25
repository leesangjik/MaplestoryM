import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components/native";
import Loader from "../components/Loader";
import VList from "../components/VList";
import { GetDate } from "../utils";

const Container = styled.FlatList``;
const SearchBar = styled.TextInput`
  background-color: white;
  width: 95%;
  margin: 15px auto;
  padding: 10px 15px;
  border-radius: 15px;
`;

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

  return (
    <Container
      ListHeaderComponent={
        <>
          <SearchBar
            placeholder="검색"
            returnKeyType="search"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
          />
        </>
      }
      data={searchData?.data.threads}
      keyExtractor={(item) => item.createDate + ""}
      renderItem={({ item }) => (
        <VList
          boardTitle="수정예정"
          title={item.title}
          nickname={item.user.nickname}
          createDate={GetDate(item.createDate)}
          readCount={item.readCount}
          likeCount={item.likeCount}
          fulldata={item}
        />
      )}
    ></Container>
  );
};

export default Search;
