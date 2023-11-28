import { currencyFormatter, currencyUSDFormatter } from "presentation/utils";
import { ReactElement } from "react";
import styled from "styled-components";

type Props = {
  balance?: number;
  limit?: number;
  message?: string;
  currency?: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledBalance = styled.div`
  font-size: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledRampBalance = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 24px;
  white-space: pre-wrap;
  overflow-wrap: normal;
  width: 281px;
  height: 43px;
`;

export const RenderBalance = ({
  balance,
  limit,
  message,
  currency,
}: Props): ReactElement => {
  if (message) {
    return (
      <Wrapper>
        <StyledRampBalance>{message ? message : ""}</StyledRampBalance>
        <div style={{ fontSize: "12px" }}>
          {limit === undefined || balance === null
            ? ""
            : limit === null
            ? "Limit: -"
            : "Limit: " + currencyFormatter(limit, currency)}
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <StyledBalance>
          {balance === undefined || balance === null
            ? ""
            : currencyFormatter(balance, currency)}
        </StyledBalance>
        <div style={{ fontSize: "12px" }}>
          {limit === undefined || balance === null
            ? ""
            : limit === null
            ? "Limit: -"
            : "Limit: " + currencyFormatter(limit, currency)}
        </div>
      </Wrapper>
    );
  }
};
