import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import AuthIllustration from "@crstl/components/assets/images/auth-illustration-update.png";
type Props = {
  children: ReactNode;
  imageText: string;
};

const MainWrapper = styled.main`
  display: flex;
  height: 100vh;
`;

const SectionOne = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.base.SECONDARY};
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  padding-top: ${({ theme }) => theme.spacing.XXL};
  padding-left: ${({ theme }) => theme.spacing.XL};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(${AuthIllustration});
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
`;

const SectionTwo = styled.div`
  flex: 2;
`;

export const TwoVerticalSectionLayout = ({
  children,
  imageText,
}: Props): ReactElement => {
  return (
    <MainWrapper>
      <SectionOne>{/* <ImageWrapper src={AuthIllustration} /> */}</SectionOne>
      <SectionTwo>{children}</SectionTwo>
    </MainWrapper>
  );
};
