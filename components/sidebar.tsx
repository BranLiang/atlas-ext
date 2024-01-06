import { XCircle } from "lucide-react";
import React, { useRef, useEffect } from "react";
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
  publications: PublicationWithDescription[];
}

const Sidebar: React.FC<SidebarProps> = ({ open, publications }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function scrollToTop() {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    scrollToTop();
  }, [publications]);

  return (
    <Container $open={open} ref={containerRef}>
      <ContentContainer>
        {publications.map((publication, index) => (
          <React.Fragment key={publication.id}>
            <Publication data={publication} />
            {index < publications.length - 1 && <Splitter />}
          </React.Fragment>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default Sidebar;
