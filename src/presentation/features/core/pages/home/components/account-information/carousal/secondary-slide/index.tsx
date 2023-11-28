import { ReactElement } from "react";
import styled from "styled-components";

type WrapperProps = {
  $bgColor?: string;
  $color?: string;
  $translateX: string;
  $transitionFactor: number;
};

const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ $bgColor }) => $bgColor};
  transform: translateX(${({ $translateX }) => $translateX});
  color: ${({ $color }) => $color};
  border-radius: 22px;
  transition: all ${({ $transitionFactor }) => $transitionFactor * 100}ms
    ease-in;
  transition-delay: ${({ $transitionFactor }) => $transitionFactor * 50}ms;
`;

const StyledName = styled.span`
  position: absolute;
  right: 16px;
  top: 8px;
  transform: rotate(90deg) translateX(100%);
  transform-origin: right;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 160px;
  white-space: nowrap;
`;

type Props = {
  bgColor?: string;
  color?: string;
  name?: string;
  translateX: string;
  showName?: boolean;
  transitionFactor: number;
};

export const SecondarySlide = ({
  bgColor,
  color,
  name,
  showName,
  translateX,
  transitionFactor,
}: Props): ReactElement => {
  return (
    <Wrapper
      $translateX={translateX}
      $color={color}
      $bgColor={bgColor}
      $transitionFactor={transitionFactor}
    >
      {showName && <StyledName>{name}</StyledName>}
    </Wrapper>
  );
};
