import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 22px;
  margin-bottom: 22px;
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
  padding: 20px 32px;
`;

const TabsContainer = styled.div`
  display: flex;
  align-items: center;

  .ant-tabs-nav:before {
    content: none;
  }
`;

const AlertBadge = styled.div`
  border: none;
  appearance: none;
  background: #ffefef;
  padding: 10px 23px;
  border-radius: 50px;
  color: red;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: -12px;
`;

const TabsAndVersionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VersionHistoryContainer = styled.div``;

export {
  TabsContainer,
  AlertBadge,
  PageWrapper,
  Container,
  VersionHistoryContainer,
  TabsAndVersionContainer,
};

