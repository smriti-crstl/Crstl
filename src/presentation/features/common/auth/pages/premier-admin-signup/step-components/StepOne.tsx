import { useUserDetailsQuery } from "domain/interactors/shared";
import { CORE_HOME } from "globals/configs";
import { ReactElement, ReactNode, useState } from "react";
import styled from "styled-components";

import { CommonStepComponentProps } from "../";
import { LoginPlugIn } from "../../../plugins/login";

interface IStepOneProps extends CommonStepComponentProps {
  children?: ReactNode;
}
const StepOneContainer = styled.div``;

export const StepOne = ({
  changeStep,
  history,
}: IStepOneProps): ReactElement => {
  const [isLoggedInSuccessfully, setIsLoggedInSuccessfully] = useState(false);
  // Queries
  // Calling the query to check if admin has completed the flow earlier or not.
  // If he has completed the flow, the isRegistered bit will be true.

  const { isLoading } = useUserDetailsQuery({
    enabled: isLoggedInSuccessfully,
    onSuccess: (data) => {
      // Checking if user is already verified, then redirect him directly to orders page
      // An admin is restricted to continue the flow only if he is visiting for the first time
      // after being created from the backend.

      if (data.isRegistered) {
        history.push(CORE_HOME);
      } else {
        changeStep(1);
      }
    },
  });

  // Functions
  const handleLoginSuccess = (): void => {
    setIsLoggedInSuccessfully(true);
  };

  return (
    <StepOneContainer>
      <LoginPlugIn
        history={history}
        redirectionCallback={handleLoginSuccess}
        isLoading={isLoading}
      />
    </StepOneContainer>
  );
};
