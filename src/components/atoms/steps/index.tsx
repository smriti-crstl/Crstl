import { ReactElement } from "react";
import { StepProps, Steps, StepsProps } from "antd";
const { Step } = Steps;

export type StepsData = { key?: string; title: string }[];

interface IProps extends Omit<StepsProps, "current"> {
  data: StepsData;
  currentStep?: number;
  stepProps?: StepProps;
}

export const SimpleSteps = ({
  currentStep,
  data,
  stepProps,
  ...rest
}: IProps): ReactElement => {
  return (
    <Steps current={currentStep} {...rest}>
      {data.map(({ key, title }) => (
        <Step key={key || title} title={title} {...stepProps} />
      ))}
    </Steps>
  );
};
