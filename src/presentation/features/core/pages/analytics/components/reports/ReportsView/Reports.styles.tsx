import styled from "styled-components";

export const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 440px 1fr;
  .grid-item {
    width: auto;
  }
`;

export const DeliveryOrderContainer = styled.div`
  display: flex;
  .grid-item {
    width: 50%;
  }
`;
