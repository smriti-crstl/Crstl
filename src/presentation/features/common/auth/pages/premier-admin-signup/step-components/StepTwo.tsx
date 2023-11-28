import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { CommonStepComponentProps } from "../";
import { ChangePasswordPlugIn } from "../../../plugins/change-password";

interface IStepOneProps extends CommonStepComponentProps {
  children?: ReactNode;
}

const StepTwoContainer = styled.div``;

export const StepTwo = ({ changeStep }: IStepOneProps): ReactElement => {
  const changePasswordSuccessCallback = (): void => changeStep(2);
  return (
    <StepTwoContainer>
      <ChangePasswordPlugIn successCallback={changePasswordSuccessCallback} />
    </StepTwoContainer>
  );
};
