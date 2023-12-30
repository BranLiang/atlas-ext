import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const Text = styled.span`
  background-clip: text;
  font-weight: bold;
  font-size: medium;
  color: transparent;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
  &:hover {
    text-decoration: underline;
    text-decoration-color: #8b5cf6;
    text-decoration-thickness: 2px;
  }
`;

interface Props {
  onClick: () => void;
}

const Toggle: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Text>Related</Text>
    </Button>
  );
};

export default Toggle;
