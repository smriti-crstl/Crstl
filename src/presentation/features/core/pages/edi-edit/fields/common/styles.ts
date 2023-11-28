import styled from "styled-components";

export const CellWrapper = styled.div`
  display: flex;
  width: 100%;
  &:hover {
    .copy-button-box {
      visibility: visible;
    }
  }
  .copy-button-box {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.base.PRIMARY};
    border-left: none;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
  }
`;

