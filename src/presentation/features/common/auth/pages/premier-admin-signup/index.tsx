import { History } from "history";
import { ReactElement, useState } from "react";
import styled from "styled-components";

import { SimpleSteps } from "components/atoms/steps";

import { AUTH_PREMIER_ADMIN_SIGN_UP_STEPS_CONFIG } from "./config";
import { StepOne } from "./step-components/StepOne";
import { StepThree } from "./step-components/StepThree";
import { StepTwo } from "./step-components/StepTwo";

const PremierAdminSignUpWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.XXL} ${theme.spacing.XL}`};
  height: 100%;
`;

const StepComponentsWrapper = styled.div`
  width: 24rem;
  margin-top: ${({ theme }) => theme.spacing.XXL};
  padding-top: ${({ theme }) => theme.spacing.XXL};
  margin-left: ${({ theme }) => theme.spacing.XXXL};
`;

export type CommonStepComponentProps = {
  changeStep: (p: 0 | 1 | 2 | 3 | 4) => void;
  history: History;
};

type PremierAdminSignUpProps = {
  history: History;
};

export const PremierAdminSignUp = ({
  history,
}: PremierAdminSignUpProps): ReactElement => {
  const [stepNumber, setStepNumber] = useState<number>(0);

  // Functions
  const changeStep = (stepNumber: number): void => {
    setStepNumber(stepNumber);
  };

  // Variables
  const currentStep = Number(stepNumber || 0);
  const commonStepProps = {
    history,
    changeStep,
  };

  return (
    <PremierAdminSignUpWrapper>
      <SimpleSteps
        currentStep={currentStep}
        data={AUTH_PREMIER_ADMIN_SIGN_UP_STEPS_CONFIG}
      />
      <StepComponentsWrapper>
        {currentStep === 0 && <StepOne {...commonStepProps} />}
        {currentStep === 1 && <StepTwo {...commonStepProps} />}
        {currentStep === 2 && <StepThree {...commonStepProps} />}
      </StepComponentsWrapper>
    </PremierAdminSignUpWrapper>
  );
};
