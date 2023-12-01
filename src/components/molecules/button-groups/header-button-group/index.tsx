import { ReactElement } from "react";
import styled from "styled-components";

import { ColoredButton } from "components/atoms/buttons";

interface ButtonGroupStyle {
  marginRight: string;
  background?: string;
  border?: string;
  boxShadow?: string;
  color?: string;
  width: string;
  height: string;
}

type ButtonGroupProp = {
  fourthButtonText: string;
  firstButtonText: string;
  secondButtonText: string;
  thirdButtonText: string;
  tabSelected: string;
  onClick: (arg: string) => void;
};

const Wrapper = styled.div`
  width: 350px;
  height: 48px;
  border: 1px solid #d9d9d9;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderButtonGroup = ({
  firstButtonText,
  secondButtonText,
  thirdButtonText,
  fourthButtonText,
  tabSelected,
  onClick,
}: ButtonGroupProp): ReactElement => {
  const unSelectedStyle: ButtonGroupStyle = {
    marginRight: "5px",
    background: "none",
    border: "none",
    boxShadow: "none",
    color: "#4F4F4F",
    width: "106px",
    height: "37px",
  };

  const selectedStyle = {
    margin: "0 5px",
    width: "106px",
    height: "37px",
  };

  return (
    <Wrapper>
      <ColoredButton
        shape="round"
        buttonProps={{ htmlType: "submit" }}
        style={
          tabSelected === firstButtonText ? selectedStyle : unSelectedStyle
        }
        onClick={() => onClick(firstButtonText)}
      >
        {firstButtonText}
      </ColoredButton>
      <ColoredButton
        shape="round"
        buttonProps={{ htmlType: "submit" }}
        style={
          tabSelected === secondButtonText ? selectedStyle : unSelectedStyle
        }
        onClick={() => onClick(secondButtonText)}
      >
        {secondButtonText}
      </ColoredButton>
      <ColoredButton
        shape="round"
        buttonProps={{ htmlType: "submit" }}
        style={
          tabSelected === thirdButtonText ? selectedStyle : unSelectedStyle
        }
        onClick={() => onClick(thirdButtonText)}
      >
        {thirdButtonText}
      </ColoredButton>
      <ColoredButton
        shape="round"
        buttonProps={{ htmlType: "submit" }}
        style={
          tabSelected === fourthButtonText ? selectedStyle : unSelectedStyle
        }
        onClick={() => onClick(fourthButtonText)}
      >
        {fourthButtonText}
      </ColoredButton>
    </Wrapper>
  );
};
