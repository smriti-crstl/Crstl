import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 56px;
  margin-bottom: 56px;

  .steps-content {
    min-height: 200px;
    margin-top: 16px;
    padding-top: 80px;
    text-align: center;
    background-color: #fafafa;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
  }

  .steps-action {
    margin-top: 24px;
  }
`;

const Header = styled.h2`
  margin-bottom: 30px;
`;

const TimelineStyles = styled.div`
  max-width: 400px;
  .ant-timeline-item-head {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;

    border: 2px solid #f0f0f0;
    border-radius: 999px;

    .anticon {
      font-size: 20px;
    }
  }

  .ant-timeline-item-content {
    margin-left: 40px;
    top: -16px;
  }

  .ant-list-item-meta-title {
    font-weight: bold;
  }

  .ant-list-item-meta-description p {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TimelineStatus = styled.p`
  color: #000000d9;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export { PageWrapper, Container, Header, TimelineStyles, TimelineStatus };
