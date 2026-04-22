import React from "react";
import styled from "styled-components";
import NewsCard from "./NewsCard";
const PostContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e5e5;
`;

const NewsList = ({ news }) => {
  return (
    <PostContainer>
      {news.length === 0 ? (
        <p style={{ color: "#ccc" }}> No news here</p>
      ) : (
        news.map((item) => <NewsCard key={item.id} news={item} />)
      )}
    </PostContainer>
  );
};

export default NewsList;
