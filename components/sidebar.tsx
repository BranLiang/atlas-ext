import { XCircle } from "lucide-react";
import React from "react";
import styled, { css } from "styled-components";
import { PublicationWithDescription } from "../utils/api";
import Publication from "./publication";

const Container = styled.div<{ $open?: boolean }>`
  border-left: 1px solid #e0e0e0;
  box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;
  background-color: #f3f4f6;
  z-index: 10;
  overflow-y: scroll;

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
  publications: PublicationWithDescription[];
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  handleClose,
  publications,
}) => {
  return (
    <Container $open={open}>
      <RelativeContainer>
        <CloseButton onClick={handleClose}>
          <XCircle />
        </CloseButton>
        <ContentContainer>
          <Title>Related</Title>
          {publications.map((publication) => (
            <Publication
              key={publication.id}
              issueNumber={publication.issue_id}
              title={publication.title}
              url={publication.url}
              content={publication.description}
            />
          ))}
        </ContentContainer>
      </RelativeContainer>
    </Container>
  );
};

export default Sidebar;
