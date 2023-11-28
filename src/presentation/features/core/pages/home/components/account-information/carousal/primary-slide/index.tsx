import { ReactElement } from "react";
import styled from "styled-components";

import { RenderAccountNumber } from "./RenderAccountNumber";
import { RenderBalance } from "./RenderBalance";

type WrapperProps = {
  $bgColor?: string;
  $color?: string;
};

const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  border-radius: 22px;
  box-shadow: 7px 0px 20px 0px #5c5c5c40;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 400ms ease;
  & > * {
    min-height: 2rem;
  }
`;

type Props = {
  bgColor?: string;
  color?: string;
  name?: string;
  balance?: number;
  accountNumber?: string;
  accountName?: string;
  limit?: number;
  message?: string;
  countOfRampCards?: number;
  currency?: string;
};

export const PrimarySlide = ({
  accountNumber,
  balance,
  name,
  bgColor,
  color,
  accountName,
  limit,
  message,
  countOfRampCards,
  currency,
}: Props): ReactElement => {
  return (
    <Wrapper $bgColor={bgColor} $color={color}>
      <div style={{ fontSize: "inherit" }}>
        <div style={{ marginBottom: "2px" }}>{name}</div>
        <div style={{ fontSize: "12px", marginBottom: "4px" }}>
          {accountName}
        </div>
      </div>

      <RenderBalance
        balance={balance}
        limit={limit}
        message={message}
        currency={currency}
      />
      <RenderAccountNumber
        accountNumber={accountNumber}
        color={color}
        countOfRampCards={countOfRampCards}
      />
    </Wrapper>
  );
};
