import { Divider } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

import { PaperCard } from "components/atoms/card";
import {
  GenericHeading,
  GenericSubHeading,
} from "components/atoms/typography";

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
`;

const StyledPre = styled.pre`
  font: inherit;
  white-space: pre-wrap;
  font-size: 1rem;
`;

const StyledAnchor = styled.a`
  &:hover {
    color: inherit;
  }
  color: inherit;
`;

export const PrivacyPolicy = (): ReactElement => {
  return (
    <Wrapper>
      <PaperCard extraPadding>
        <GenericHeading>Crstl&apos;s Shopify App Privacy Policy</GenericHeading>
        <Divider />
        <StyledPre>
          <b>{`Crstl's Shopify App`}</b>
          {` "the App” provides`}
          <b>{` omnichannel order workflow management and analytics`}</b>
          {` "the Service" to merchants who use Shopify to power their stores. This Privacy Policy describes how personal information is collected, used, and shared when you install or use the App in connection with your Shopify-supported store.`}
        </StyledPre>
        <GenericSubHeading isGreyDisabled>
          Personal Information the App Collects
        </GenericSubHeading>
        <StyledPre>
          {`When you install the App, we are automatically able to access certain types of information from your Shopify account: GET /admin/api/2021-04/orders.json?status=any to obtain information such as Order Number; Order Date; Order Total; Products; Customer Name; Customer Contact Information; Address/Shipping Details.`}
        </StyledPre>
        <GenericSubHeading isGreyDisabled>
          How Do We Use Your Personal Information?
        </GenericSubHeading>
        <StyledPre>
          {`We use the personal information we collect from you and your customers in order to provide the Service and to operate the App. `}
        </StyledPre>
        <GenericSubHeading isGreyDisabled>
          Sharing Your Personal Information
        </GenericSubHeading>
        <StyledPre>
          {`We do not share your personal information with any third parties.`}
        </StyledPre>
        <StyledPre>
          {`Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.

Changes: We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.

Contact Us: For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at `}
          <StyledAnchor href="mailto:privacy@crstl.so">
            <b>privacy@crstl.so</b>.
          </StyledAnchor>
        </StyledPre>
      </PaperCard>
    </Wrapper>
  );
};
