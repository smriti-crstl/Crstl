import { ReactElement, ReactNode } from "react";
import { TwoVerticalSectionLayout } from "components/organisms/layouts";
type Props = {
  children: ReactNode;
};

export const AuthContainerLayout = ({ children }: Props): ReactElement => {
  return (
    <TwoVerticalSectionLayout imageText="Crstl">
      {children}
    </TwoVerticalSectionLayout>
  );
};
