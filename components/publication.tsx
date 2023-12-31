import { ExternalLink } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";

interface PublicationProps {
  issueNumber: number;
  title: string;
  url: string | null;
  content: string;
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const IssueTag = styled.div`
  text-transform: uppercase;
  padding: 2px 4px;
  font-weight: bold;
  font-size: small;
  border-radius: 2px;
  display: inline-block;
  color: #0c4a6e;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: medium;
  display: inline-block;
  color: #262626;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande";
  border: none;
  margin-right: 6px;
`;

const Link = styled.a`
  text-decoration: none;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover > h2 {
    text-decoration: underline;
    text-decoration-color: #8b5cf6;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
`;

const MarkdownWrapper = styled.div`
  img {
    max-width: 100%;
    border: none;
  }

  p:has(img) {
    padding: 12px;
  }

  & > p {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: small;
    line-height: normal;
    margin-bottom: 6px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 36px;
  padding: 6px 0;
  background-color: #f3f4f6;
`;

const Publication: React.FC<PublicationProps> = ({
  issueNumber,
  title,
  url,
  content,
}) => {
  return (
    <Wrapper>
      <Header>
        {url ? (
          <Link href={url} target="_blank">
            <Title>{title}</Title>
            <ExternalLink size={18} color="#6b7280" />
          </Link>
        ) : (
          <Title>{title}</Title>
        )}
        <IssueTag>Issue #{issueNumber}</IssueTag>
      </Header>
      <MarkdownWrapper>
        <Markdown>{content}</Markdown>
      </MarkdownWrapper>
    </Wrapper>
  );
};

export default Publication;
