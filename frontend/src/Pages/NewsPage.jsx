import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Heading = styled.h2`
  font-size: 38px;
  margin: 0;
`;
const PostContainer = styled.div`
  margin: 30px 0;
  max-width: 800px;
  border: 1px solid #e5e5e5;
  padding: 20px 15px;
  p {
    font-size: 26px;
    line-height: 1.5;
    margin: 0;
  }
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const AuthorEmail = styled.p`
  font-size: 18px;
  color: #555;
  margin: 0 0 10px;
`;
const NewsDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #555;
  font-style: italic;
  padding: 10px 0;
`;

const FeedLink = styled(Link)``;
const EditFromLink = styled(Link)``;
const EditButton = styled.button`
  width: 100px;
  padding: 10px 15px;
  color: #fff;
  border: none;
  border-radius: 2px;
  background-color: #1b69fa;
`;
const DeleteButton = styled.button`
  background-color: #4f4e4e;
  width: 100px;
  padding: 10px 15px;
  color: #fff;
  border-radius: 2px;
  border: none;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 10px 0;
`;
const ReturnButton = styled.button`
  background-color: #ed0909;
  width: 300px;
  padding: 10px 15px;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 20px;
`;
const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsPost, setNewsPost] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/newsposts/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch news post");
        }

        return data;
      })
      .then((data) => setNewsPost(data))
      .catch((error) => {
        console.error("Error loading news post:", error);
        navigate("/");
      });
  }, [id, navigate]);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!newsPost) {
        throw new Error("No news post loaded");
      }

      const response = await fetch(`${API_URL}/newsposts/${newsPost.id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete post");
      }

      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      navigate("/");
    }
  };
  if (!newsPost) return <p>Loading...</p>;
  return (
    <div>
      <h1>{newsPost.title}</h1>
      <PageContainer>
        <PostContainer>
          <Heading>{newsPost.title}</Heading>
          <NewsDate>
            {formatDistanceToNow(new Date(newsPost.createdAt), {
              addSuffix: true,
            })}
          </NewsDate>
          <p>{newsPost.text}</p>
          <AuthorEmail>
            Added by: {newsPost.author?.email || "Unknown author"}
          </AuthorEmail>
          <Footer>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            <EditFromLink to={`/edit-news/${id}`}>
              <EditButton>Edit Post</EditButton>
            </EditFromLink>
          </Footer>
        </PostContainer>

        <FeedLink to={`/`}>
          <ReturnButton>Return to The NewsFeed</ReturnButton>
        </FeedLink>
      </PageContainer>
    </div>
  );
};
export default NewsPage;
