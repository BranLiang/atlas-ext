import { Lightbulb, LightbulbOff } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { currentToggled, toggleItem } from "../utils/dom";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const DefaultSvgWrapper = styled.div`
  svg {
    color: #8b8b8b;
  }

  &:hover > svg {
    color: #4d7c0f;
  }
`;

const ActiveSvgWrapper = styled.div`
  svg {
    color: #4d7c0f;
  }
`;

interface Props {
  id: number;
}

const Toggle: React.FC<Props> = ({ id }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    window.addEventListener("atlas-ext-show", handleEvent);
    window.addEventListener("atlas-ext-hide", handleEvent);
  }, [id]);

  const handleEvent = () => {
    setIsOn(currentToggled() === id.toString());
  };

  const handleClick = () => {
    toggleItem(id);
  };

  return (
    <Button onClick={handleClick}>
      {isOn && (
        <ActiveSvgWrapper>
          <LightbulbOff size={18} strokeWidth={3} />
        </ActiveSvgWrapper>
      )}
      {!isOn && (
        <DefaultSvgWrapper>
          <Lightbulb size={18} strokeWidth={3} />
        </DefaultSvgWrapper>
      )}
    </Button>
  );
};

export default Toggle;
