import styled from "styled-components";
import { Spinner } from "@crstl/components/atoms/loading";

interface IStepTitle {
  strong?: boolean;
  disabled?: boolean;
}

interface IStepIcon {
  selected?: boolean;
}

interface ICustomDot {
  futureState: boolean;
  disabled?: boolean;
}

export const PageWrapper = styled.div`
  padding: 0 28px;
`;

export const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 24px;
`;

export const StepsStyles = styled.div`
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
  padding: 20px;
  background-color: #f6f9fd;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 177px;
  overflow: auto;

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

  .ant-steps {
    max-width: 80%;
    margin: 0 auto;
  }

  .ant-steps-dot .ant-steps-item-tail {
    top: 17px;
  }

  .ant-steps-dot .ant-steps-item-process .ant-steps-item-icon {
    height: auto;
  }

  .ant-steps-dot .ant-steps-item-tail::after {
    margin-left: 24px;
    height: 16px;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #bfc7ff;
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #e6ebf9;
  }

  .ant-steps-label-vertical .ant-steps-item-content {
    margin-left: 22px;
  }

  .ant-steps-dot .ant-steps-item-content {
    width: 200px;
  }

  .ant-steps-dot .ant-steps-item-icon,
  .ant-steps-dot.ant-steps-small .ant-steps-item-icon {
    margin-left: 97px;
  }

  .ant-steps-dot .ant-steps-item-tail,
  .ant-steps-dot.ant-steps-small .ant-steps-item-tail {
    margin-left: 100px;
  }

  .ant-spin {
    min-height: 135px !important;
  }
`;

export const StyledStepsSpinner = styled(Spinner)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f9fd;
  z-index: 1;
`;

export const StepTitle = styled.div<IStepTitle>`
  font-family: Inter;
  font-size: 20px;
  font-weight: ${(props) => (props.strong ? 600 : 300)};
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepIcon = styled.div<IStepIcon>`
  opacity: ${(props) => (props.selected ? 1 : 0.55)};
`;

export const CustomDotStyle = styled.div<ICustomDot>`
  width: 52px;
  height: 51px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) =>
    props.futureState
      ? props.disabled
        ? "4px solid #F0F0F0"
        : "4px solid #E6EBF9"
      : "none"};
  background: ${(props) => (props.futureState ? "white" : "#bfc7ff")};
`;

export const BorderContainer = styled.div<IStepIcon>`
  width: 40px;
  height: 40px;
  border: ${(props) => (props.selected ? "2px solid white" : "none")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionWrapper = styled.div`
  margin-top: 8px;
`;

export const POBox = styled.div`
  background: rgb(255, 249, 194);
  font-size: 12px;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 35px;
  border: 1px solid rgb(248, 224, 131);
`;
