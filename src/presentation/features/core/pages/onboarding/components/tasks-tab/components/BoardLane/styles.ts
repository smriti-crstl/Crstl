import styled from "styled-components";

export const LaneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 11px rgba(212, 217, 228, 0.25);
  padding: 25px 0;

  width: 270px;
  min-width: 270px;

  height: fit-content;
  max-height: 98%;
`;

export const LaneHeader = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  padding: 0 16px;
  align-items: center;
`;

export const ColorCircle = styled.div`
  border: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 6px;
`;

export const CardsCount = styled.span`
  margin-left: auto;
`;

export const LaneContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  padding: 0 12px;

  overflow-y: auto;
`;

