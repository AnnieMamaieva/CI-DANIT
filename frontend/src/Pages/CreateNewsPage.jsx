import React from "react";
import ModalNews from "../components/ModalNews";
import NewsForm from "../components/NewsForm";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const CreateNewsPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  const handleCreate = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to create news");
      }

      const response = await fetch(`${API_URL}/newsposts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: formData.title,
          text: formData.text,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create news");
      }

      navigate("/");
    } catch (error) {
      console.error("Create news error:", error);
    }
  };
  return (
    <ModalNews onClose={handleClose}>
      <NewsForm
        initialValues={{ title: "", text: "" }}
        onSubmit={handleCreate}
        onCancel={handleClose}
        submitLabel="Publish"
        formTitle="Publish Article"
      />
    </ModalNews>
  );
};

export default CreateNewsPage;
