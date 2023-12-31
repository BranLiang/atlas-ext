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

const CloseButton = styled.button`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 36px;
  width: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  background-color: #f3f4f6;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    color: #0c4a6e;
  }

  &:hover > svg {
    color: #111827;
  }
`;

const ContentContainer = styled.div`
  padding: 12px;
  padding-top: 0;
`;

const Splitter = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 12px 0;
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
      <CloseButton onClick={handleClose}>
        <XCircle />
      </CloseButton>
      <ContentContainer>
        {publications.map((publication, index) => (
          <React.Fragment key={publication.id}>
            <Publication
              issueNumber={publication.issue_id}
              title={publication.title}
              url={publication.url}
              content={publication.description}
            />
            {index < publications.length - 1 && <Splitter />}
          </React.Fragment>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default Sidebar;
