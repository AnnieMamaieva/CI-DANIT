import React from "react";
import ModalNews from "../components/ModalNews";
import NewsForm from "../components/NewsForm";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../api";

const EditNewsPage = () => {
  const [newsPost, setNewsPost] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  const { id } = useParams();
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
          throw new Error(data?.message || "Failed to load post");
        }

        return data;
      })
      .then((data) => setNewsPost(data))
      .catch((error) => {
        console.error("Error loading post:", error);
        navigate("/");
      });
  }, [id, navigate]);
  const handleEdit = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/newsposts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update news");
      }

      navigate(`/newsposts/${id}`);
    } catch (error) {
      console.error("Edit news error:", error);
    }
  };
  if (!newsPost) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Edit your recent post</h1>
      <ModalNews onClose={handleClose}>
        <NewsForm
          initialValues={{ title: newsPost.title, text: newsPost.text }}
          onSubmit={handleEdit}
          onCancel={handleClose}
          submitLabel="Save changes"
          formTitle="Edit News"
        />
      </ModalNews>
    </div>
  );
};

export default EditNewsPage;
