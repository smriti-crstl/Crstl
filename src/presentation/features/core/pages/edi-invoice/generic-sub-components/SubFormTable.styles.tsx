import styled from "styled-components";

const WideContainer = styled.div`
  margin-left: -150px;
  margin-right: -150px;
`;

const Container = styled.div`
  margin-bottom: 20px;
  .ant-table {
    margin-top: 20px;
    margin-bottom: 20px;

    .ant-form-item {
      margin-bottom: 0;
    }
  }
`;

const SubFormContainer = styled(Container)`
  position: relative;
  padding: 20px;
  border: 2px solid #dedede;

  .remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    font-size: 24px;
  }
`;

export { WideContainer, Container, SubFormContainer };
