import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;
const ModalWrapper = styled.div`
  background: #ffffff;
  color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding: 10px;
`;
const CloseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const ModalNews = ({ children, onClose }) => {
  return (
    <Backdrop onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {children}
      </ModalWrapper>
    </Backdrop>
  );
};

export default ModalNews;
