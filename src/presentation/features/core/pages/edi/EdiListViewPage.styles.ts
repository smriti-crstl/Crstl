import styled from "styled-components";

export const StyledToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToolTipTitleContainer = styled.span`
  background: #f5f3f3;
  border-radius: 44px;
  padding: 4px 32px;
  margin-top: 6px;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  padding-left: 8px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
`;

export const ColouredDot = styled.div`
  background: ${(props) => props.color};
  height: 12px;
  width: 12px;
  border-radius: 999999px;
  margin-right: 16px;
`;

export const OrderIdContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
