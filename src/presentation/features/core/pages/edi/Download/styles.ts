import styled, { css } from "styled-components";

const CommonButtonStyles = css`
  height: 64px;
  width: 64px;
  background: ${({ theme }) => theme.palette.colors.ROYAL_BLUE};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  z-index: 9999999999;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 20%);
  cursor: pointer;
`;

export const DownloadCSVContainer = styled.div`
  ${CommonButtonStyles}

  right: 100px;
`;

export const DownloadShipmentDocsContainer = styled.div`
  ${CommonButtonStyles}

  right: 180px;
`;

