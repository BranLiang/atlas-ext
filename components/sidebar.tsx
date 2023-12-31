import { XCircle } from "lucide-react";
import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div<{ $open?: boolean }>`
  border-left: 1px solid #e0e0e0;
  height: 100%;
  width: 300px;
  position: fixed;
  right: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;
  background-color: #f3f4f6;
  z-index: 10;

  // Applying dynamic styles based on the open prop
  ${(props) =>
    props.$open
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(100%);
        `}
`;

const RelativeContainer = styled.div`
  position: relative;
  height: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  text-transform: uppercase;
  background-clip: text;
  font-weight: bold;
  font-size: x-large;
  color: transparent;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
`;

interface SidebarProps {
  open: boolean;
  handleClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, handleClose }) => {
  return (
    <Container $open={open}>
      <RelativeContainer>
        <CloseButton onClick={handleClose}>
          <XCircle />
        </CloseButton>
        <ContentContainer>
          <Title>Related</Title>
        </ContentContainer>
      </RelativeContainer>
    </Container>
  );
};

export default Sidebar;
