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
  background-color: #f3f4f6;
  border-radius: 10px;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 0.8rem;
  display: inline-block;
`;

const Title = styled.h2`
  text-transform: uppercase;
  background-clip: text;
  font-weight: bold;
  font-size: x-large;
  color: transparent;
  display: inline-block;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
`;

const Link = styled.a`
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #8b5cf6;
    text-decoration-thickness: 2px;
  }
`;

const MarkdownWrapper = styled.div`
  img {
    max-width: 100%;
    border-radius: 1rem;
  }

  p:has(img) {
    padding: 10px 20px;
  }

  & > p {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: small;
    line-height: normal;
  }
`;

const Publication: React.FC<PublicationProps> = ({
  issueNumber,
  title,
  url,
  content,
}) => {
  return (
    <Wrapper>
      <IssueTag>Issue #{issueNumber}</IssueTag>
      {url ? (
        <Link href={url}>
          <Title>{title}</Title>
        </Link>
      ) : (
        <Title>{title}</Title>
      )}
      <MarkdownWrapper>
        <Markdown>{content}</Markdown>
      </MarkdownWrapper>
    </Wrapper>
  );
};

export default Publication;
