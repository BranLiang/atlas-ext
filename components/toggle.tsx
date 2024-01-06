import { Lightbulb } from "lucide-react";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  svg {
    color: #8b8b8b;
  }

  &:hover > svg {
    color: #4d7c0f;
  }
`;

interface Props {
  onClick: () => void;
}

const Toggle: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Lightbulb size={18} strokeWidth={3} />
    </Button>
  );
};

export default Toggle;
