import { Divider } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

import { PaperCard } from "@crstl/components/atoms/card";
import {
  GenericHeading,
  GenericSubHeading,
} from "@crstl/components/atoms/typography";

// const Bold = styled.strong``;

// const Underline = styled.u``;

const Italic = styled.i``;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;

  li,
  i {
    font-size: 1rem;
  }

  i {
    margin-bottom: 8px;
    display: inline-block;
  }

  li {
    line-height: 1.7rem;
  }
`;

const StyledPre = styled.pre`
  font: inherit;
  white-space: pre-wrap;
  font-size: 1rem;
  display: block;
`;

const CONTENTS = [
  "Information We Collect",
  "Use of Information",
  "Sharing of Information",
  "Analytics Services Provided by Others",
  "Transfer of Information to the U.S. and Other Countries",
  "Your Choices",
  "Contact Us",
];

export const PrivacyPolicy = (): ReactElement => {
  return (
    <Wrapper>
      <PaperCard extraPadding>
        <GenericHeading $alignCenter>CRSTL PRIVACY POLICY</GenericHeading>
        <Divider />
        <GenericSubHeading isGreyDisabled>
          Last Updated: June 18, 2021
        </GenericSubHeading>
        <StyledPre>
          This Privacy Policy (&quot;Policy&quot;) notifies you about Crstl
          Technologies, Inc.’s (&quot;Crstl&quot;, &quot;we&quot; or
          &quot;us&quot;) privacy practices, including how we collect, use, and
          disclose information about you when you access or use our applications
          and website at www.crstl.so (&quot;Site&quot;), and any web-based
          tools and services made available to you by us through the Site
          (collectively, the &quot;Services&quot;).
          <br />
          <br />
          We may change this Privacy Policy from time to time. If we make
          material changes, we will notify you by revising the date at the top
          of the Policy and, in some cases, we may provide you with additional
          notice (such as adding a statement to our website homepage or sending
          you a notification). We encourage you to review the Privacy Policy
          often to stay informed about our information practices and the choices
          available to you.
          <br />
          <br />
          By using our Services, you agree to the privacy practices described in
          this Policy. If you do not agree with this Policy, please stop using
          our Services.
        </StyledPre>

        <GenericHeading>CONTENTS</GenericHeading>
        <ul>
          {CONTENTS.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <GenericHeading>INFORMATION WE COLLECT</GenericHeading>
        <StyledPre>
          The information we collect from you varies depending on the way you
          use our Services. When you simply browse our public website as a
          consumer (&quot;Consumer&quot;) to explore our Services or to learn
          more about us, the information we collect and use is different from
          the information we collect if you become a Crstl business user
          (&quot;Business User&quot;) and purchase and/or license one of our
          products or services. Below, we describe the different ways we might
          collect information from you.
        </StyledPre>
        <GenericSubHeading isGreyDisabled>
          Information You Provide to Us
        </GenericSubHeading>
        <StyledPre>
          We collect information you provide directly to us.
        </StyledPre>
        <Italic>Consumers</Italic>
        <StyledPre>
          For example, when you use our services as a Consumer, if you contact
          us for more information about our company, or otherwise communicate
          with us to learn more about our products and services, we collect
          personal information, which may include:
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Telephone number</li>
            <li>Address</li>
          </ul>
        </StyledPre>

        <Italic>Business Users</Italic>
        <StyledPre>
          If you become a Business User, we collect certain personal information
          from you and/or your authorized users in order to facilitate our
          business relationship with you and provide you our products and
          services (collectively, &quot;Business Personal Information&quot;).
          Business Personal Information we may collect from you and/or your
          authorized users includes:
          <ul>
            <li>Name</li>
            <li>Business Name</li>
            <li>Job Title</li>
            <li>Email address associated with your business</li>
            <li>Postal and billing address</li>
            <li>Phone number</li>
            <li>Account login ID and password, chosen by you</li>
          </ul>
        </StyledPre>

        <StyledPre>
          We also collect information a Business User chooses to provide
          relating to its customers or individuals that it serves
          (&quot;Business Customer&quot;). Business Users must provide their
          Business Customers any required notices and collect any necessary
          consents before providing or disclosing any such information
          (collectively &quot;Business Customer Information&quot;) to us. Crstl
          does not directly collect or control Business Customer Information,
          but rather Business Users determine what Business Customer Information
          they collect from their Business Customers, and to the extent Crstl
          receives that information, we do so on behalf of our Business Users.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Information We Collect Automatically When You Use our Services
        </GenericSubHeading>
        <StyledPre>
          When you access or use our Services, we automatically collect
          information about you, including:
          <ul>
            <li>
              Log Information: We collect information related to your access to
              and use of the Services, including the type of browser you use,
              access times, pages viewed, your IP address, and the page you
              visited before navigating to our Services.
            </li>
            <li>
              Device Information: We collect information about the computer or
              mobile device you use to access our Services, including the
              hardware model, operating system and version, unique device
              identifiers, and mobile network information.
            </li>
            <li>
              Information Collected by Cookies and Similar Tracking
              Technologies: We (and those that perform work for us) may use
              different technologies, including cookies, web beacons and other
              tracking technologies to collect information about you and your
              interaction with our Services, including information about your
              browsing behavior. Cookies are small data files stored on your
              hard drive or in device memory that help us improve our Services
              and your experience, see which areas and features of our Services
              are popular, and count visits. Web beacons (also known as
              &quot;pixel tags&quot; or &quot;clear GIFs&quot;) are electronic
              images that may be used in our Services or emails and help deliver
              cookies, count visits, and understand usage and campaign
              effectiveness. For more information about cookies and how to
              disable them, see Your Choices below.
            </li>
          </ul>
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Information We Collect from Other Sources
        </GenericSubHeading>
        <StyledPre>
          We may also obtain information about you from other sources, such as
          from third parties from whom you direct us to obtain data in
          connection with your use of our Services.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Information We Derive
        </GenericSubHeading>
        <StyledPre>
          We may derive information or draw inferences from you based on the
          information we (or those that perform work for us) collect. For
          example, we may make inferences about your location based on your IP
          address.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Aggregated or De-identified Information
        </GenericSubHeading>
        <StyledPre>
          Aggregated or de-identified information that cannot reasonably be used
          to identify an individual is not considered personal information. We
          do not limit the ways we use or share aggregated or de-identified
          information or information we aggregate or de-identify collected
          through our Site or Services, and we do not limit our third-party
          providers from using, selling, licensing, distributing, or disclosing
          aggregated or de-identified information.
        </StyledPre>

        <GenericHeading>USE OF INFORMATION</GenericHeading>
        <StyledPre>
          We use the information we collect from or about you in various ways,
          including to provide, maintain, and improve the Services. We also use
          the information we collect to:
          <ul>
            <li>
              Provide our Services to you, and to understand your preferences to
              enhance your experience using our Services;
            </li>
            <li>
              Send you technical notices, updates, security alerts, and support
              and administrative messages and to respond to your comments,
              questions, and customer service requests;
            </li>
            <li>
              Communicate with you about products, services, events, and
              opportunities offered by us and others and provide news and
              information we think will be of interest to you (see Your Choices
              below for information about how to opt out of these communications
              at any time);
            </li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our Services;
            </li>
            <li>
              Detect, investigate, and prevent security incidents, protect
              against malicious, deceptive, fraudulent, or illegal activity, and
              protect the rights and property of Crstl and others;
            </li>
            <li>
              Debug to identify and repair errors that impair existing intended
              functionality;
            </li>
            <li>In connection with research and development activities;</li>
            <li>
              Comply with applicable laws, regulations, or industry
              requirements, or respond to subpoenas or government requests;
            </li>
            <li>
              Carry out any other purpose described to you at the time the
              information was collected; and
            </li>
            <li>Fulfill any other purpose for which you provided consent.</li>
          </ul>
        </StyledPre>

        <GenericHeading>SHARING OF INFORMATION</GenericHeading>
        <StyledPre>
          We may share information about you as follows or as otherwise
          described in this Privacy Policy:
          <ul>
            <li>
              With vendors, service providers, and consultants that perform work
              for us, including web hosting, analytics, customer service and
              email services;
            </li>
            <li>
              With third parties whom you direct us to interact with as part of
              your use of our Services;
            </li>
            <li>
              In response to a request for information if we believe disclosure
              is in accordance with, or required by, any applicable law or legal
              process, including lawful requests by public authorities to meet
              national security or law enforcement requirements;
            </li>
            <li>
              If we believe your actions are inconsistent with our user
              agreements or policies, if we believe you have violated the law,
              or to protect the rights, property, and safety of Crstl or others;
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of
              company assets, financing, or acquisition of all or a portion of
              our business by another company;
            </li>
            <li>
              Between and among Crstl and our current and future parents,
              affiliates, subsidiaries, and other companies under common control
              and ownership; and
            </li>
            <li>With your consent or at your direction.</li>
          </ul>
        </StyledPre>

        <GenericHeading>ANALYTICS SERVICES PROVIDED BY OTHERS</GenericHeading>
        <StyledPre>
          We may allow others to provide analytics services. These entities may
          use cookies, web beacons, device identifiers and other technologies to
          collect information about your use of the Services, including your IP
          address, web browser, network information, pages viewed, time spent on
          pages, links clicked, and conversion information. This information may
          be used by us and others to, among other things, analyze and track
          data, determine the popularity of certain parts of our Services,
          improve your experience on our Services, and better understand your
          online activity.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Browser Do Not Track
        </GenericSubHeading>

        <StyledPre>
          Our Site does not support Do Not Track (DNT) at this time. DNT is a
          privacy preference you can set in your web browser to indicate that
          you do not want certain information about your web page visits tracked
          and collected across websites. For more details, including how to turn
          on Do Not Track, visit www.donottrack.us.
        </StyledPre>

        <GenericHeading>
          TRANSFER OF INFORMATION TO THE U.S. AND OTHER COUNTRIES
        </GenericHeading>
        <StyledPre>
          Crstl is based in the United States, and we offer our goods and
          services only to individuals and businesses in the United States.
          However, we process and store information in the U.S. and other
          jurisdictions. Therefore, we and those that perform work for us may
          transfer your information to, or store or access it in, jurisdictions
          that may not provide equivalent levels of data protection as your home
          jurisdiction.
        </StyledPre>

        <GenericHeading>YOUR CHOICES</GenericHeading>
        <GenericSubHeading isGreyDisabled>Cookies</GenericSubHeading>
        <StyledPre>
          Most web browsers are set to accept cookies by default. If you prefer,
          you can usually choose to set your browser to remove or reject browser
          cookies. Please note that if you choose to remove or reject cookies,
          this could affect the availability and functionality of our Services.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Access and Choices about Your Information
        </GenericSubHeading>
        <StyledPre>
          You may access, update, and correct certain account information at any
          time by logging into your account. If you wish to delete your account,
          please contact us at hello@crstl.so, but note that we may retain
          certain information as required by law or for our legitimate business
          purposes. If you do not have an account with us, you can access
          information we may have about you by contacting us at hello@crstl.so.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Promotional Communications
        </GenericSubHeading>
        <StyledPre>
          You may opt out of receiving promotional emails from us by following
          the instructions in those emails. If you opt out, we may still send
          you non-promotional emails, such as those about your account or our
          ongoing business relations.
        </StyledPre>

        <GenericSubHeading isGreyDisabled>
          Links to other Websites and Services
        </GenericSubHeading>
        <StyledPre>
          We are not responsible for the practices employed by websites or
          services linked to or from the Site or Services, including the
          information or content contained in such websites or services, and
          this Policy does not apply to them. Your browsing and interaction on
          any third-party website or service, including those that have a link
          on or to our Site or Services, are subject to that third party’s own
          rules and privacy policies. Please read the terms of such websites and
          applications carefully and exercise care when providing your personal
          information.
        </StyledPre>

        <GenericHeading>CONTACT US</GenericHeading>
        <StyledPre>
          If you have any questions about this Policy, please contact us at
          hello@crstl.so.
        </StyledPre>

        <StyledPre>
          Crstl Technologies, Inc. <br />
          San Francisco, CA
        </StyledPre>
      </PaperCard>
    </Wrapper>
  );
};
