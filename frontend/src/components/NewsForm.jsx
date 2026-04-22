import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 10px;
`;
const Title = styled.h4`
  color: #000;
  font-size: 24px;
  margin: 0;
`;
const Footer = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 6px;
  justify-content: flex-end;
`;
const ModalInput = styled.input`
  width: 100%;
  min-height: 20px;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  background: #fff;
  color: #111827;
  resize: none;
  box-sizing: border-box;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: #484747;
`;
const ErrorText = styled.p`
  margin: 0;
  color: #c70000;
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
`;
const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  background: #fff;
  color: #111827;
  resize: none;
  outline: none;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
`;
const SubmitButton = styled.button`
  max-width: 300px;
  padding: 5px 15px;
  color: #fff;
  border: none;
  border-radius: 2px;
  background-color: #1b69fa;
`;
const CancelButton = styled.button`
  background-color: #4f4e4e;
  max-width: 300px;
  padding: 5px 15px;
  color: #fff;
  border-radius: 2px;
  border: none;
`;

const NewsForm = ({
  initialValues = { title: "", text: "" },
  onSubmit,
  onCancel,
  submitLabel = "Publish",
  formTitle = "",
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [text, setText] = useState(initialValues.text);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) {
      setError("Headline and Article are required");
      return;
    }
    setError("");
    onSubmit({
      title: title.trim(),
      text: text.trim(),
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Title>{formTitle}</Title>
      <Label>
        Headline
        <ModalInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the headline"
        />
      </Label>
      <Label>
        Content of Article
        <ModalTextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your news article here..."
        />
      </Label>
      {error && <ErrorText>{error}</ErrorText>}
      <Footer>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit">{submitLabel}</SubmitButton>
      </Footer>
    </Form>
  );
};

export default NewsForm;
