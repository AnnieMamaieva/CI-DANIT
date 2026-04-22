import styled from "styled-components";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Post = styled.div`
  background-color: rgba(248, 248, 248, 0.93);
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  padding: 18px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;
const Header = styled.div``;
const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #0c2d63;
  transition: color 0.2s ease;
`;
const AuthorEmail = styled.p`
  margin: 6px 0 10px;
  font-size: 15px;
  color: #555;
`;
const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  color: #000000;
  padding: 0 6px;
  margin-bottom: 10px;
  font-size: 18px;
`;
const NewsDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: #555;
  font-style: italic;
`;
const NewsLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover ${NewsTitle} {
    color: #2167d8;
    cursor: pointer;
  }
`;

const NewsCard = ({ news }) => {
  return (
    <Post>
      <Header>
        <NewsLink to={`/newsposts/${news.id}`}>
          <NewsTitle>{news.title}</NewsTitle>
        </NewsLink>
        <AuthorEmail>
          Added by: {news.author?.email || "Unknown author"}
        </AuthorEmail>
      </Header>
      <Content>{news.text}</Content>
      <NewsDate>
        {news.createdAt
          ? formatDistanceToNow(new Date(news.createdAt), {
              addSuffix: true,
            })
          : "No date"}
      </NewsDate>
    </Post>
  );
};

export default NewsCard;
