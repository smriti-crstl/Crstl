import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  .span-4 {
    grid-column: span 4;
  }

  .label-small {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 1844px;
  max-width: 100%;
  margin: auto;
  margin-top: 56px;
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;
`;

const OutputContainer = styled.div`
  textarea {
    min-height: 500px;
  }
`;

const SubFormContainer = styled.div`
  .ant-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }
`;

const SubFormGrid = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  padding-top: 40px;
  padding-right: 40px;
  border: 2px solid #dedede;
  border-radius: 8px;
  position: relative;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  .subform-grid-container {
    grid-column: span 4;
  }
`;

const CloseButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`;

export {
  GridContainer,
  Container,
  OutputContainer,
  SubFormContainer,
  SubFormGrid,
  CloseButton,
};
