import styled from "styled-components";

export const ViewModeContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 100%;
  border-radius: 4px;
  margin-top: 20px;

  .form-group.has-error .error-detail {
    display: none;
  }

  .rjsf > div > button {
    display: none;
  }

  .ant-col-lg-8 {
    display: initial;
  }

  .full-width {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    /* to hide empty div's */
    &:empty {
      display: none;
    }
  }

  .half-width {
    width: 50%;

    /* to hide empty div's */
    &:empty {
      display: none;
    }
  }

  .loop-item-row {
    width: 100%;

    & > .form-group.field {
      display: flex;
      flex-wrap: wrap;

      gap: 24px;

      & > .form-group.field:not(:empty) {
        flex: 1 1 0px;
      }
    }
  }

  .bordered {
    & > .loop-item-row,
    & > .hl-loop-item-row {
      border-bottom: 1px solid
        ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE_FADED};
    }
  }

  .hl-loop-item-row {
    width: 100%;

    & > .form-group.field {
      display: flex;
      flex-wrap: wrap;
    }
  }

  /* // * Note following code is to specifically style ASN components */
  /* // ! WARNING: do not change anything here */
  .HL_loop_item > .hl-loop-item-row {
    & > .form-group.field {
      gap: 24px;

      & > .form-group.field:not(:empty) {
        flex: 1 1 0px;
      }
    }
  }
`;

export const BorderedSubFormWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
    white-space: pre-line;
  }
`;

/** Common Styles shared across different view pages */
export const PageWrapper = styled.div`
  padding: 0 28px;
`;

export const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 24px;
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
  padding: 42px 28px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

