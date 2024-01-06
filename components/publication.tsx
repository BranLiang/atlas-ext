import { ExternalLink } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import { PublicationWithDescription } from "../utils/api";

interface PublicationProps {
  data: PublicationWithDescription;
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
  &:hover {
    color: #6b7280;
  }
  &:hover > h2 {
    text-decoration: underline;
    text-decoration-color: #6b7280;
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

  blockquote {
    margin: 6px 0;
    padding-left: 1em;
    border-left: 0.5em solid #d1d5db;
    background-color: #f3f4f6; /* Adds a light grey background to the blockquote */
  }

  blockquote p,
  li {
    font-size: small;
    font-style: italic;
    font-weight: normal;
    line-height: normal;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande";
    color: #6b7280;
  }

  ol,
  ul {
    padding-left: 20px; /* Adds padding to ordered and unordered lists inside blockquote */
  }

  a {
    color: #8b5cf6;
    text-decoration: underline;
    &:hover {
      color: #6d28d9;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding-top: 6px;
  background-color: #f3f4f6;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const SubHeaderDate = styled.div`
  font-size: small;
  color: #6b7280;
`;

const Publication: React.FC<PublicationProps> = ({
  data: {
    issue_id,
    title,
    url,
    description,
    issue_url,
    issue_published_at,
    section,
    item_index,
  },
}) => {
  return (
    <Wrapper>
      <Header>
        {url ? (
          <Link href={url} target="_blank">
            <Title>{title}</Title>
            <ExternalLink size={14} color="#6b7280" />
          </Link>
        ) : (
          <Title>{title}</Title>
        )}
        {issue_url && (
          <Link href={issue_url} target="_blank">
            <IssueTag>
              #{issue_id}
              {item_index && ` - ${section}`}
            </IssueTag>
          </Link>
        )}
      </Header>
      <SubHeader>
        <SubHeaderDate>{issue_published_at}</SubHeaderDate>
      </SubHeader>
      <MarkdownWrapper>
        <Markdown skipHtml={true}>{description}</Markdown>
      </MarkdownWrapper>
    </Wrapper>
  );
};

export default Publication;
