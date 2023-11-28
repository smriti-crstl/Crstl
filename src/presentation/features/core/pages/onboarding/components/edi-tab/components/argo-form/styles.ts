import styled from "styled-components";

export const DynamicFormContainer = styled.div`
  .form-group {
    margin-bottom: 0;
  }

  .form-group.has-error .error-detail {
    display: none;
  }

  .rjsf > div > button {
    display: none;
  }

  .ant-form-label .form-label {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .ant-alert.ant-alert-error {
    margin-bottom: 12px;
  }

  grid-column-end: span 6;

  .no-display {
    display: none;
  }
  .grid-two-column {
    fieldset {
      display: grid;
      justify-content: start;
      grid-template-columns: 300px 300px;
      grid-column-gap: 32px;
    }
  }
  .grid-three-column {
    .field fieldset {
      display: grid;
      justify-content: start;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      // grid-template-columns: 300px 300px 300px;
      grid-column-gap: 32px;
    }

    .array-item-toolbox {
      width: 200px;
      margin-bottom: 40px;
      max-width: 100%;
    }
  }
  .array-item-move-up,
  .array-item-move-down {
    display: none;
  }

  .bordered {
    /* // * For object type data, which need border-bottom  */
    border-bottom: 1px solid ${({ theme }) => theme.palette.colors.WHITE_SMOKE};
    margin-bottom: 20px;

    /* // * For array type data, which need border-bottom for each individual row item  */
    & > .loop-item-row {
      border-bottom: 1px solid
        ${({ theme }) => theme.palette.colors.WHITE_SMOKE};
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

export const SectionTitleContainer = styled.div`
  padding: 0;
  font-weight: 500;
  font-size: 18px;
  background-color: ${({ theme }) => theme.palette.background.PRIMARY};
`;
