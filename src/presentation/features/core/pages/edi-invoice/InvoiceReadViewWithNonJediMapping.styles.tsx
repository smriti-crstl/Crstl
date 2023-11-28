import styled from "styled-components";

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 56px;
  margin-bottom: 56px;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  .span-4 {
    grid-column: span 4;
  }
`;

const SubFormContainer = styled.div`
  border: 2px solid #dedede;
  border-radius: 8px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  .subform-grid-container {
    grid-column: span 4;
  }
`;

const FieldContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  .label {
    margin: 0;
    font-size: 12px;
    line-height: 18px;
  }

  .value {
    margin: 0;
  }
`;

export { Container, FieldContainer, FormContainer, SubFormContainer };
