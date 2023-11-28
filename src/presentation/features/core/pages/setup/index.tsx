import { QuestionForm } from "./components/QuestionForm";
import { VendorIdList } from "./components/VendorIdList";
import {
  PageContainer,
  LeftSection,
  RightSection,
  SectionContainer,
} from "./styles";

const CoreSetup = () => {
  return (
    <PageContainer>
      <SectionContainer>
        <LeftSection>
          <QuestionForm />
        </LeftSection>
        <RightSection>
          <VendorIdList />
        </RightSection>
      </SectionContainer>
    </PageContainer>
  );
};

export default CoreSetup;

