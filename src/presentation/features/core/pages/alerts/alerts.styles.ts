import styled from "styled-components";

export const ExpandedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-right: 48px;
  padding-left: 72px;
`;

export const ParentRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 2px;
`;

export const Subtitle = styled.div`
  font-size: 12px;
  font-weight: 100;
  color: ${(props) => props.theme.palette.colors.GRAY};
`;

export const BodyRowContainer = styled.div``;

export const Row = styled.div``;

export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1200px;
  margin: 20px auto;
  padding: 0 12px;
`;

export const FilterPills = styled.div`
  margin-left: 100px;
`;
