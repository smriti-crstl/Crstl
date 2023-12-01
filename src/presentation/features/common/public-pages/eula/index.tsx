import { Divider } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

import { PaperCard } from "components/atoms/card";
import {
  GenericHeading,
  GenericSubHeading,
} from "components/atoms/typography";

const Bold = styled.strong``;

// const Underline = styled.u``;

// const Italic = styled.i``;

const ItalicAndBold = styled.strong`
  font-style: italic;
`;

const UnderlinedAndBold = styled.strong`
  text-decoration: underline;
`;

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
    margin-bottom: 8px;
  }
  ol {
    margin-bottom: 8px;
  }
`;

const StyledPre = styled.pre`
  font: inherit;
  white-space: pre-wrap;
  font-size: 1rem;
  display: block;
`;

export const Eula = (): ReactElement => (
  <Wrapper>
    <PaperCard extraPadding>
      <GenericHeading $alignCenter>
        CRSTL TECHNOLOGIES, INC.
        <br />
        END USER LICENSE AGREEMENT
      </GenericHeading>
      <Divider />
      <GenericSubHeading isGreyDisabled>
        Effective Date: June 18, 2021
      </GenericSubHeading>
      <StyledPre>
        This terms of this End User License Agreement (&quot;
        <ItalicAndBold>Terms</ItalicAndBold>&quot;) constitutes a binding
        agreement between you (&quot;<ItalicAndBold>you</ItalicAndBold>&quot; or
        &quot;<ItalicAndBold>your</ItalicAndBold>&quot;) and Crstl Technologies,
        Inc. (&quot;<ItalicAndBold>Crstl</ItalicAndBold>&quot;) relating to your
        access to and use of the www.crstl.so website and platform (the &quot;
        <ItalicAndBold>Site</ItalicAndBold>&quot;), including all web-based
        tools, services, and data made available to you by Crstl (collectively
        with the Site, the &quot;<ItalicAndBold>Services</ItalicAndBold>&quot;).
      </StyledPre>

      <StyledPre>
        PLEASE CAREFULLY READ THESE TERMS. IF YOU DO NOT AGREE WITH THESE TERMS
        IN THEIR ENTIRETY, DO NOT ACCESS OR USE THE SERVICES OR ANY COMPONENT
        THEREOF. BY CLICKING &quot;I ACCEPT&quot; AND USING THE SERVICES OR
        ACCESSING ANY DATA OR INFORMATION MADE AVAILABLE THROUGH THE SERVICES,
        YOU REPRESENT AND WARRANT (I) THAT YOU ARE AT LEAST 18 YEARS OLD AND
        THAT YOU ARE LEGALLY ABLE TO ENTER INTO THESE TERMS, (II) YOU HAVE READ,
        UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS, AND (III) YOU HAVE THE
        AUTHORITY TO ENTER INTO THESE TERMS PERSONALLY AND ON BEHALF OF THE
        ENTITY THAT HAS NAMED YOU AS AN AUTHORIZED USER (AS DEFINED BELOW) OR
        ACCOUNT ADMINISTRATOR (AS DEFINED BELOW) UNDER SUCH ENTITY’S ACCOUNT,
        AND TO BIND THAT ENTITY TO THIS AGREEMENT.
      </StyledPre>

      <StyledPre>
        Crstl reserves the right, from time to time, in its sole discretion, to
        revise, modify, or update these Terms. When material changes are made,
        Crstl will provide you with notice either by email or through the
        Services. We will also update the &quot;Last Updated&quot; date at the
        top of the Terms. Crstl may require you to provide consent to the
        updated Terms in a specified manner before further use of the Services.
        If you do not agree to any change(s) after receiving notice of such
        change(s), you agree to stop using the Services. Otherwise, your
        continued use of the Services constitutes your acceptance of such
        changes. PLEASE REGULARLY CHECK THE SERVICES TO VIEW THE CURRENT TERMS.
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 1&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>The Services.</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        <ol type="a">
          <li>
            <Bold>Crstl Services.</Bold> &nbsp;&nbsp;&nbsp;Crstl operates a
            proprietary web-based platform that allows you to manage your
            business&apos;s operations and finances in one place. Our Services
            enable you to pull information from various third-party sources and
            services through which you operate your business and aggregate such
            information to enable you to easily track your business&apos;s
            operations and performance.
          </li>
          <li>
            <Bold>Custom Services.</Bold> &nbsp;&nbsp;&nbsp; From time to time,
            you and Crstl may agree to additional services, requiring data
            exchange, or bespoke customizations of and developments related to
            the Services (&quot;
            <ItalicAndBold>Custom Services</ItalicAndBold>&quot;), which may be
            subject to the payment of additional fees and separate terms and
            conditions. In the event Crstl, in its discretion, determines that
            such Custom Services require extensive customization or development
            effort, the Custom Services will be subject to a separate agreement,
            including terms related to any applicable fees for the Custom
            Services.
          </li>

          <li>
            <Bold>Third-Party Services.</Bold> &nbsp;&nbsp;&nbsp; Our Services
            allow you to connect to and share information with us on our
            Services from third-party sources and services (e.g. Quickbooks,
            Plaid, Shopify) (collectively, &quot;
            <ItalicAndBold>Third-Party Services</ItalicAndBold>&quot;). Your
            dealings or correspondence with third parties and your use of or
            interaction with any Third-Party Services (including any information
            shared between you and a Third-Party Service) are solely between you
            and the third party and may be subject to third-party terms. Your
            use of Third-Party Services may be subject to and governed by those
            applicable third-parties’ terms and conditions (&quot;
            <ItalicAndBold>Third-Party TOU</ItalicAndBold>
            &quot;), but those terms and conditions will not otherwise apply to
            your access to or use of our Services. In the event of a conflict
            between these Terms and the terms and conditions of a Third-Party
            Service provider, the Third-Party TOU will control with respect to
            your access to and use of their services only. Crstl does not
            control or endorse, and makes no representations or warranties
            regarding, any Third-Party Services, and your access to and use of
            such Third-Party Services is at your own risk. If you install,
            enable, or interact with a Third-Party Service, you agree that we
            may allow access to your data or information, which may include your
            Business Customer Information (as defined below), as required to
            enable the interoperation of that Third-Party Service with our
            Services. We are not responsible for any processing, handling,
            disclosure, modification or deletion of any of your data or
            information, including your Business Customer Information, resulting
            from that Third-Party Service&apos;s interaction with or provision
            of services to you.
          </li>
        </ol>
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 2&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>Access and Use of the Services.</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        <ol type="a">
          <li>
            <Bold>Accounts.</Bold>
            <ol type="1">
              <li>
                <Bold>Registration.</Bold>&nbsp;&nbsp;&nbsp; Accessing and using
                the Services requires registration and creation of an account
                with Crstl (&quot;
                <ItalicAndBold>Account</ItalicAndBold>&quot;). One individual
                representing your entity must register for an account as the
                Account Administrator (&quot;
                <ItalicAndBold>Account Administrator</ItalicAndBold>&quot;). In
                order to establish an Account as an authorized user of such
                entity (&quot;<ItalicAndBold>Authorized User</ItalicAndBold>
                &quot;), you must be designated as an authorized user of the
                Account by the relevant Account Administrator. In registering
                for an Account as an Authorized User, you must identify your
                organization and be granted access by the Account Administrator.
                In registering for an Account, you agree to (i) provide true,
                accurate, current and complete information as prompted by the
                Account registration page (&quot;
                <ItalicAndBold>Registration Data</ItalicAndBold>&quot;), and
                (ii) maintain and promptly update the Registration Data to keep
                it accurate, current and complete. You are entirely responsible
                for maintaining the confidentiality of your password and you are
                fully responsible for any actions taken through your Account.
              </li>

              <li>
                <Bold>Restrictions.</Bold>&nbsp;&nbsp;&nbsp; You may not use the
                Account, username, or password of someone else at any time. You
                agree to notify Crstl immediately of any unauthorized use of
                your Account, user name, or password. You may be held liable for
                any losses incurred by Crstl due to someone else’s use of your
                Account or password. Crstl is not liable for any loss that you
                incur as a result of someone else accessing your Account or
                using your password, either with or without your knowledge.
              </li>
            </ol>
          </li>

          <li>
            <Bold>Access Rights and Ownership.</Bold>

            <ol type="1">
              <li>
                <Bold>Access and Use Rights.</Bold>

                <ol type="i">
                  <li>
                    <Bold>Services.</Bold>&nbsp;&nbsp;&nbsp;Subject to these
                    Terms and any additional terms and policies referenced
                    herein, Crstl hereby grants you a limited, non-exclusive,
                    non-assignable, non-sublicensable, and non-transferable
                    right, during the Term, to access and use the Services as
                    stated on an applicable order form or invoice (&quot;
                    <ItalicAndBold>Order</ItalicAndBold>&quot;) for your
                    internal business purposes. Any violation of these Terms
                    will, at Crstl&apos;s discretion, immediately and
                    automatically terminate the foregoing license without notice
                    to you.
                  </li>
                  <li>
                    <Bold>Training Materials.</Bold>&nbsp;&nbsp;&nbsp;As part of
                    the Services, Crstl may make available or provide certain
                    documentation, information, or other materials regarding the
                    use of the Services (&quot;
                    <ItalicAndBold>Documentation</ItalicAndBold>&quot;). Crstl
                    and its licensors own and reserve all right, title, and
                    interest in and to any and all Documentation, as well as all
                    know-how, ideas and other intellectual property rights
                    embodied or reflected therein. For clarity, all
                    Documentation will be considered Crstl&apos;s and its
                    licensors’ Confidential Information (as defined below), and
                    your use of such Documentation is subject to the
                    confidentiality obligations set forth herein.
                  </li>
                </ol>
              </li>

              <li>
                <Bold>Restrictions.</Bold>&nbsp;&nbsp;&nbsp;You may not use the
                Services in any manner or for any purpose other than as
                expressly permitted by these Terms or in a separate mutually
                acceptable, duly executed, and delivered written agreement
                between you and Crstl that expressly supersedes the provisions
                set forth in these Terms. You will not, and will not permit any
                third party, to: (i) reverse engineer, decompile, disassemble,
                decode, decrypt, re-engineer, reverse assemble, reverse compile
                or otherwise translate, create, or attempt to recreate or
                replicate the methodology or the source code of or trade secrets
                in the Services or its structural framework (in whole or in
                part), or perform any process intended to determine the source
                code for or trade secrets in the Services; (ii) modify, correct,
                adapt, translate, enhance or create derivative works or
                improvements based upon any Services, or otherwise change any
                Services; (iii) circumvent or attempt to circumvent any
                technological protection measures intended to restrict access to
                or use of any portion of the Services or the functionality of
                the Services; (iv) use the Services for any purpose that is
                illegal in any way; (v) alter, remove or obscure any copyright
                or trademark notice in the Services; (vi) except as expressly
                permitted by these Terms, make available any portion of the
                Services through electronic mail or the Internet; (vii)
                voluntarily or involuntarily in any form or manner assign,
                sublicense, transfer, pledge, copy, loan, publish, rent, sell,
                lease, lend, license, distribute or share or otherwise provide
                direct, remote, or other access to the Services or any right
                under these Terms to or with any other person or entity,
                including providing outsourcing or on-line services to third
                parties; (viii) use the Services to develop a competing product
                or for any other purpose that is to Crstl’s commercial
                disadvantage; (ix) submit any Business Customer Information or
                material to the Services that infringes or misappropriates the
                intellectual property rights of any third party or otherwise
                violates the privacy or other proprietary right of any third
                party; or (x) access or use the Services in any manner, except
                as expressly provided in these Terms.
              </li>
              <li>
                <Bold>Ownership.</Bold>&nbsp;&nbsp;&nbsp;Except for the licenses
                granted herein, you acknowledge that you have no right, title or
                interest in or to the Services or any of its content. Crstl and
                its licensors own and reserve all right, title, and interest in
                and to all intellectual property rights embodied in or related
                to the Services or any of its content, except for Business
                Customer Information and Customer Content. You are prohibited
                from using the name Crstl Technologies, Inc. and other graphics,
                logos, trademarks and copyrights of Crstl without our prior
                written consent.
              </li>

              <li>
                <Bold>Business Customer Information.</Bold>
                &nbsp;&nbsp;&nbsp;In the course of accessing and using the
                Services, you will submit or give us access to certain
                electronic data and information related to you and your
                organization&apos;s business, including data concerning you and
                your organization&apos;s end customers (collectively, &quot;
                <ItalicAndBold>Business Customer Information</ItalicAndBold>
                &quot;).
                <ol type="i">
                  <li>
                    You hereby grant Crstl a non-exclusive, royalty-free right
                    to access, use, copy, distribute, perform, display and
                    process Business Customer Information during the Term to:
                    (a) provide and improve the Services, including to prevent
                    or address service or technical problems; (b) perform other
                    activities at your direction or request, including
                    processing initiated by you through your use of the
                    Services; or (c) as compelled by law. Subject to the
                    foregoing license, you and the entity you represent retain
                    all right, title and interest in and to all Business
                    Customer Information.
                  </li>
                  <li>
                    We process Business Customer Information to perform our
                    Services on your behalf. You are the &quot;controller&quot;
                    or &quot;business&quot;, as defined under applicable law,
                    with respect to Business Customer Information. You, on
                    behalf of you and your entity, represent, warrant, and
                    covenant that (A) you have the right and obtained all
                    necessary permissions and consents to use and submit the
                    Business Customer Information in connection with our
                    Services, and (B) you have delivered, and will deliver, any
                    notices or disclosures required under applicable law or
                    regulations for us to process Business Customer Information
                    in connection with the Services.
                  </li>
                </ol>
              </li>

              <li>
                <Bold>Customer Content.</Bold>
                &nbsp;&nbsp;&nbsp; You are solely responsible for all content
                that you or your entity (including Account Administrator and
                Authorized Users) provide through the Services, to Crstl, or
                from Third-Party Services (collectively, &quot;
                <ItalicAndBold>Customer Content</ItalicAndBold>&quot;). You
                retain ownership of Customer Content. However, in addition to
                any other rights granted to Crstl under these Terms, by
                providing Customer Content through the Services, you grant Crstl
                and its licensors and providers all necessary rights and
                licenses in and to Customer Content necessary for Crstl to
                provide you access to and use of the Services and otherwise
                perform its obligations described in these Terms. You represent
                and warrant to Crstl that neither Customer Content nor the use
                of Customer Content by Crstl as permitted will: (1) violate
                these Terms or any applicable laws, rules, or regulations; (2)
                be libelous, defamatory, obscene, abusive, pornographic,
                threatening, or an invasion of privacy; (3) constitute an
                infringement or misappropriation of the intellectual property
                rights or other rights of any third party; (4) be illegal in any
                way or advocate illegal activity; (5) be false, misleading, or
                inaccurate; or (6) be considered junk mail, spam, a part of a
                pyramid scheme, a disruptive commercial message or disruptive
                advertisement. Crstl is not responsible or liable for any
                deletion, correction, destruction, damage, loss, or failure to
                store or back-up any Customer Content. You represent and warrant
                to Crstl that you have all rights, permissions, and consents
                necessary to grant Crstl each of the foregoing rights set forth
                in this Section.
              </li>

              <li>
                <Bold>
                  Special Provisions Applicable to Users Outside the United
                  States.
                </Bold>
                &nbsp;&nbsp;&nbsp;The following provisions apply to you if you
                are located outside of the United States: (i) you consent to
                having your personal data transferred to and processed in the
                United States; and (ii) if you are located in a country
                embargoed by the United States, or are on the U.S. Treasury
                Department’s list of Specially Designated Nationals, you will
                not engage in commercial activities through the Services.
              </li>
              <li>
                <Bold>Feedback.</Bold>
                &nbsp;&nbsp;&nbsp; We encourage you to provide and share with us
                your questions, comments, suggestions, ideas, and feedback
                regarding the Services (collectively, &quot;
                <ItalicAndBold> Feedback</ItalicAndBold>&quot;). You agree that
                Crstl has no obligations (including without limitation
                obligations of confidentiality, royalty, or accounting) with
                respect to such Feedback. You represent and warrant that you
                have all rights necessary to submit the Feedback, and you hereby
                irrevocably and unconditionally assign and transfer to Crstl all
                right, title, and interest in and to such Feedback automatically
                upon your submission of the Feedback to Crstl or any of its
                licensors or affiliates.
              </li>
            </ol>
          </li>

          <li>
            <Bold>Fees and Payment</Bold>
            &nbsp;&nbsp;&nbsp;
            <ol type="1">
              <li>
                <Bold>Payment Terms.</Bold>
                &nbsp;&nbsp;&nbsp;Your access and use of the Services is
                contingent on timely and full payment of the applicable fees set
                forth in the applicable Order. Crstl reserves the right to
                suspend or limit your access to the Services, should you or your
                organization fail to remit timely payment. You agree to
                immediately notify Crstl of any change in your billing address
                or credit card account used for payment hereunder. Crstl
                reserves the right at any time to change its prices and billing
                methods, either immediately upon posting through the Services or
                by email delivery to you or your organization.
              </li>
              <li>
                <Bold>Taxes.</Bold>
                &nbsp;&nbsp;&nbsp;Crstl&apos;s fees are net of any applicable
                Sales Tax (as defined below). If any Services, or payment for
                any Services, under the Terms are subject to Sales Tax in any
                jurisdiction and you have not remitted the applicable Sales Tax
                to Crstl, your or your organization will be responsible for the
                payment of such Sales Tax and any related penalties or interest
                to the relevant tax authority. &quot;
                <ItalicAndBold>Sales Tax</ItalicAndBold>&quot; means any sales
                or use tax, and any other tax measured by sales, proceeds, that
                Crstl is permitted to pass to its customers, that is the
                functional equivalent of a sales tax where the applicable taxing
                jurisdiction does not otherwise impose a sales or use tax. You
                and the entity you represent agree to make all payments of fees
                to Crstl free and clear of, and without reduction for, any
                withholding taxes. Any such taxes imposed on payments of fees to
                Crstl will be your sole responsibility, and you will provide
                Crstl with official receipts issued by the appropriate taxing
                authority, or such other evidence as Crstl may reasonably
                request, to establish that such taxes have been paid.
              </li>
            </ol>
          </li>
        </ol>
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 3&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>Confidentiality.</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        <ol type="a">
          <li>
            <Bold>Confidential Information.</Bold>
            &nbsp;&nbsp;&nbsp;&quot;
            <ItalicAndBold>Confidential Information</ItalicAndBold>&quot; means
            any and all: ; proprietary or confidential data and information
            disclosed by a party (the &quot;
            <ItalicAndBold>Disclosing Party</ItalicAndBold>&quot;) to the other
            party (the &quot;<ItalicAndBold>Receiving Party</ItalicAndBold>
            &quot;), whether orally or in writing, that is designated as
            confidential or that reasonably should be understood to be
            confidential given the nature of the information and the
            circumstances of disclosure. Without limiting the foregoing
            definition, Business Customer Information will be considered your
            Confidential Information; and the Services and Documentation will be
            considered Crstl&apos;s Confidential Information. The obligations of
            the parties set forth in this Section do not apply to Confidential
            Information that (1) is or becomes publicly known through no act or
            omission of the Receiving Party, (2) was rightfully known by
            Receiving Party without confidential or proprietary restriction
            before receipt from the Disclosing Party, (3) becomes rightfully
            known to Receiving Party by a third party without confidential or
            proprietary restriction from the Disclosing Party, or (4) is
            independently developed by the Receiving Party without the use of or
            reference to the Confidential Information of the Disclosing Party.
          </li>
          <li>
            <Bold>Nondisclosure and Nonuse.</Bold>
            &nbsp;&nbsp;&nbsp;Each party (1) will maintain in confidence the
            Confidential Information of the other party, (2) will not use or
            grant the use of the Confidential Information of the other party
            except to the extent reasonably necessary in connection with such
            party’s activities as expressly authorized by these Terms, and (3)
            will not disclose the Confidential Information of the other party
            except on a need-to-know basis to such party’s affiliates and their
            respective directors, officers, employees, consultants, and
            advisors, to the extent such disclosure is reasonably necessary in
            connection with such party’s activities as expressly authorized by
            these Terms. To the extent that disclosure to any person is
            authorized by these Terms, prior to disclosure, a party will obtain
            written agreement (or legal or other fiduciary obligation) from such
            person to hold in confidence and not disclose, use or grant the use
            of the Confidential Information of the other party except as
            expressly permitted under these Terms. Each party will notify the
            other party promptly upon discovery of any unauthorized use or
            disclosure of the other party’s Confidential Information. Each party
            agrees that the terms and conditions of any Order entered into under
            these Terms will be treated as Confidential Information of both
            parties and will not be disclosed to any third party, provided,
            however, that each party may disclose the terms and conditions of
            such Order: (x) to such party’s legal counsel, accountants, banks,
            financing sources and their advisors; (y) in connection with the
            enforcement of these Terms or rights under these Terms; or (z) in
            connection with an actual or proposed equity investment, merger,
            acquisition or similar transaction.
          </li>

          <li>
            <Bold>Permitted Disclosure.</Bold>
            &nbsp;&nbsp;&nbsp;The confidentiality and non-disclosure obligations
            under this Section will not apply to the extent that a party is
            required to disclose information by applicable law, regulation, rule
            (including rule of a stock exchange or automated quotation system),
            or order of a governmental agency or a court of competent
            jurisdiction or legal process, including tax authorities (in each
            case as determined by the party’s legal counsel); provided, however,
            that the party will provide advanced written notice of such
            disclosure to the other party, consult with the other party with
            respect to such disclosure and provide the other party sufficient
            opportunity to object to any such disclosure or to request
            confidential treatment or a protective order (if applicable).
          </li>
        </ol>
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 4&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>Disclaimers of Warranties</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        You acknowledge and agree that the disclaimers and limits set forth in
        these Terms reflect the reasonable and fair allocation of risk between
        you and Crstl and are an essential basis of this contract between you
        and Crstl. Your use of the Services and the information you obtain
        through the Services is at your own risk. NEITHER CRSTL, NOR ANY OF ITS
        EMPLOYEES, AGENTS, AFFILIATES, VENDORS AND LICENSORS (THE &quot;
        <ItalicAndBold>CRSTL PARTIES</ItalicAndBold>&quot;), MAKES ANY
        REPRESENTATIONS, WARRANTIES OR GUARANTEES, WHETHER EXPRESS, IMPLIED, OR
        STATUTORY, ABOUT THE QUALITY, ACCURACY, RELIABILITY, AVAILABILITY,
        COMPREHENSIVENESS, ADEQUACY, COMPLETENESS, SECURITY OR TIMELINESS OF THE
        SERVICES, CUSTOM SERVICES, DOCUMENTATION, OR ANY CONTENT OR INFORMATION
        THEREIN (COLLECTIVELY, &quot;<ItalicAndBold>MATERIALS</ItalicAndBold>
        &quot;), OR THAT THE MATERIALS OR SERVICES WILL BE ERROR-FREE OR
        UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE MATERIALS,
        SERVICES OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR
        OTHER HARMFUL COMPONENTS OR THAT THE MATERIALS WILL OTHERWISE MEET YOUR
        NEEDS OR EXPECTATIONS. CRSTL AND THE CRSTL PARTIES SHALL NOT HAVE ANY
        LIABILITY FOR ANY ERRORS, MISTAKES, INACCURACIES OR OMISSIONS IN THE
        SERVICES OR MATERIALS, WHETHER PROVIDED BY CRSTL OR THE CRSTL PARTIES OR
        ANY OTHER PERSON OR ENTITY. THE SERVICES AND MATERIALS ARE PROVIDED ON
        AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY
        WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, CRSTL,
        FOR ITSELF AND THE CRSTL PARTIES, DISCLAIMS ALL WARRANTIES, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF TITLE,
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 5&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>Limitation of Liability.</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL CRSTL OR THE
        CRSTL PARTIES BE LIABLE TO ANY PERSON OR ENTITY FOR ANY DAMAGES OF ANY
        KIND WHATSOEVER, ARISING OUT OF OR IN CONNECTION WITH (A) THESE TERMS;
        (B) THE USE, DISCLOSURE, DISPLAY, OR MAINTENANCE OF REGISTRATION
        INFORMATION OR FEEDBACK PROVIDED THROUGH THE SERVICES, INCLUDING ANY
        PERSONAL INFORMATION; (C) THE USE OR MISUSE OF THE SERVICES BY ANY
        PERSON OR ENTITY; (D) ANY OF THE CONTENT OR OTHER MATERIALS MADE
        AVAILABLE THROUGH THE SERVICES; (E) THE USE, PROCESSING, DISCLOSURE,
        LOSS OR DESTRUCTION OF BUSINESS CUSTOMER INFORMATION OR CUSTOMER
        CONTENT; (F) OR OTHERWISE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR
        ANY OTHER LEGAL THEORY, AND WHETHER OR NOT CRSTL OR ANY OF THE CRSTL
        PARTIES IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. AS USED IN THIS
        SECTION, &quot;DAMAGES&quot; MEANS DIRECT, INCIDENTAL, CONSEQUENTIAL,
        INDIRECT, PUNITIVE, RELIANCE, EXEMPLARY AND/OR SPECIAL DAMAGES,
        INCLUDING LOST PROFITS OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS
        INTERRUPTION. YOUR RIGHT TO ACCESS AND USE THE SERVICES IS CONDITIONED
        UPON YOUR ACCEPTANCE OF THESE TERMS, INCLUDING BUT NOT LIMITED TO ITS
        DISCLAIMERS OF WARRANTIES AND LIMITATIONS OF LIABILITY. YOU AGREE THAT
        YOUR EXCLUSIVE REMEDY SHALL BE TO IMMEDIATELY STOP USING THE SERVICES.
        YOU AGREE THAT THE LIMITATIONS OF LIABILITY SET FORTH IN THIS SECTION
        WILL SURVIVE ANY TERMINATION OR EXPIRATION OF THESE TERMS AND WILL APPLY
        EVEN IF ANY LIMITED REMEDY SPECIFIED HEREIN IS FOUND TO HAVE FAILED ITS
        ESSENTIAL PURPOSE. IN ANY CASE, NOTWITHSTANDING ANYTHING IN THESE TERMS
        OR ANY ORDER TO THE CONTRARY, THE AGGREGATE LIABILITY OF CRSTL OR ANY OF
        THE CRSTL PARTIES HEREUNDER WILL NOT EXCEED ONE HUNDRED DOLLARS ($100).
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 6&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>Indemnity.</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        You will defend, indemnify, and hold harmless Crstl, the Crstl Parties,
        and their respective officers, directors, members, managers, employees,
        consultants, advisors, agents, and representatives (collectively, the
        &quot;<ItalicAndBold>Indemnified Parties</ItalicAndBold>&quot;), from
        any and all claims, liability, damages, losses, suits, expenses, and/or
        costs (including reasonable attorneys’ fees) (collectively, &quot;
        <ItalicAndBold>Claims</ItalicAndBold>&quot;) suffered by any Indemnified
        Party arising from or relating to (a) your access or use of the
        Services, (b) your violation of these Terms and/or any representations
        or warranties contained herein, (c) your violation of any applicable law
        or regulation, (d) the Business Customer Information or Customer
        Content; or (e) your use of Third Party Services. Crstl will endeavor to
        notify you promptly of any such Claim and will provide you with
        reasonable assistance, at your expense, in defending any such Claim.
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 7&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>Term and Termination.</UnderlinedAndBold>
      </GenericSubHeading>

      <StyledPre>
        <ol type="a">
          <li>
            <Bold>Term.</Bold>
            &nbsp;&nbsp;&nbsp;These Terms shall remain in full force and effect
            commencing on the date you accept these Terms until your
            organization no longer has any active Orders with us (the &quot;
            <ItalicAndBold>Term</ItalicAndBold>&quot;), unless terminated
            earlier in accordance with the provisions herein. The initial term
            of any Order entered into pursuant to these Terms will be set forth
            in the applicable Order and may renew for subsequent periods as
            provided in such Order.
          </li>
          <li>
            <Bold>Termination.</Bold>
            &nbsp;&nbsp;&nbsp; Crstl may terminate these Terms in the event you
            materially breach any provision of these Terms and do not fully cure
            such breach within 10 days of receipt of notice of such breach from
            Crstl, except for your breach of Sections 2(b)(2)-(6), or your
            organization&apos;s insolvency or bankruptcy, for which Crstl may
            immediately terminate these Terms. You agree that all terminations
            for cause by Crstl shall be made in Crstl&apos;s sole discretion,
            and that Crstl shall not be liable to you or any third party for any
            termination of your Account.
          </li>
          <li>
            <Bold>Effect of Termination.</Bold>
            &nbsp;&nbsp;&nbsp; Upon termination of these Terms, your right to
            use such Services will automatically terminate immediately.
          </li>
        </ol>
      </StyledPre>

      <GenericSubHeading isGreyDisabled>
        SECTION 8&nbsp;&nbsp;&nbsp;
        <UnderlinedAndBold>General.</UnderlinedAndBold>
        <ol type="a">
          <li>
            <Bold>Arbitration.</Bold>
            &nbsp;&nbsp;&nbsp; Any controversy arising under or related to these
            Terms, and any disputed claim by any party against another under
            these Terms, excluding any dispute relating to patent validity or
            infringement arising under these Terms, shall be settled by
            arbitration in accordance with the then existing Commercial
            Arbitration Rules of the International Chamber of Commerce (the
            &quot;<Bold>Rules</Bold>&quot;). This Arbitration Agreement is
            governed by the Federal Arbitration Act (“FAA”) and evidences a
            transaction involving commerce. Upon request by a party, arbitration
            will be by a panel of three arbitrators within 30 days of such
            arbitration request. Each party shall select one arbitrator, and the
            final arbitrator shall be appointed by the arbitrators designed by
            each party. The arbitration shall be conducted in English. Judgment
            upon the award rendered by the panel shall be final and
            non-appealable and may be entered in any court having jurisdiction
            thereof. In order to conduct discovery, and in addition to the
            discovery provisions provided under the Rules, the parties expressly
            incorporate into any arbitration occurring under these Terms the
            discovery rules provided for in the Federal Rules of Civil Procedure
            of the United States of America. Any arbitration shall be held in
            San Francisco, CA, unless the parties hereto mutually agree in
            writing to another place. Notwithstanding the foregoing, nothing in
            this provision shall be construed to bar a party from seeking
            equitable relief in order to preserve the status quo or prevent
            irreparable harm.
          </li>
          <li>
            <Bold>Governing Law.</Bold>
            &nbsp;&nbsp;&nbsp;These Terms and your use of the Services shall be
            construed in accordance with and governed by the laws of the United
            States and the State of California, without regard to their rules
            regarding conflicts of law. You irrevocably consent to the exclusive
            jurisdiction and venue of the state or federal courts in San
            Francisco, California, USA for all disputes arising out of or
            related to the use of the Materials or these Terms that are not
            required to be arbitrated per Section 8(a), and you hereby submit to
            the personal jurisdiction of such courts. Crstl and you agree that
            the Uniform Computer Information Transaction Act (UCITA), or any
            version of UCITA adopted by any state, including California, will
            not govern or be used to interpret these Terms. The United Nations
            Convention on Contracts for the International Sale of Goods
            (UNCCISG) does not apply to these Terms.
          </li>
          <li>
            <Bold>Notices.</Bold>
            &nbsp;&nbsp;&nbsp;Unless otherwise specified in these Terms, any
            notices required or allowed under these Terms will be provided in
            one of several ways: (1) by postal mail to the address for Crstl
            listed on the Site; (2) electronically by sending you an email to
            any email address you provide to Crstl in connection with your
            Account; or (3) in the case of any notice or communication
            applicable both to you and other users of our Service, Crstl may
            instead provide such notice or communication by posting it on the
            Site. Notices provided to Crstl will be deemed given when actually
            received by Crstl. Notices or communications provided to you will be
            deemed given 24 hours after posting to the Site or sending via
            e-mail, unless (as to e-mail) the sending party is notified that the
            e-mail address is invalid.
          </li>

          <li>
            <Bold>Force Majeure.</Bold>
            &nbsp;&nbsp;&nbsp; With the exception of any monetary obligations
            under this Terms, neither party will be responsible for performance
            of its obligations hereunder where delayed or hindered by events
            beyond its reasonable control, including, without limitation, acts
            of God or any governmental body, war or national emergency,
            pandemic, riots or insurrection, sabotage, embargo, fire, flood,
            accident, strike or other labor disturbance, or interruption of or
            delay in systems, power or telecommunications under third-party
            control.
          </li>
          <li>
            <Bold>Miscellaneous.</Bold>
            &nbsp;&nbsp;&nbsp;These Terms and any Order incorporating reference
            to these Terms constitute the entire agreement between Crstl and you
            regarding your access and use of the Services and supersede any
            prior agreements between you and Crstl concerning these matters. If
            any of these Terms is found to be inconsistent with applicable law,
            void, or unenforceable for any reason, the remaining portions (and
            any partially-enforceable provisions) shall not be affected thereby
            and shall remain valid and enforceable to the maximum possible
            extent. Crstl&apos;s failure to enforce any of these Terms will not
            be deemed a waiver of such term or any other terms herein or a
            consent to any subsequent breach of the same or another term. You
            may not assign or transfer your rights and obligations under these
            Terms without the prior written consent of Crstl. Crstl may assign
            or transfer its rights and obligations under these Terms at any time
            and without notifying you. The following sections shall survive any
            termination of these Terms: Sections 2(a)(2) (Restrictions), 2(b)(2)
            (Restrictions), 2(b)(3) (Ownership), 2(b)(4)(ii) (Business Customer
            Information), 2(b)(7) (Feedback), 2(c)(2) (Taxes), 3
            (Confidentiality), 4 (Disclaimers of Warranties), 5 (Limitation of
            Liability), 6 (Indemnity), and 8 (General). Section titles are for
            convenience only and have no legal effect. The Indemnified Parties
            are third-party beneficiaries to these Terms.
          </li>
          <li>
            <Bold>Contact info.</Bold>
            &nbsp;&nbsp;&nbsp; If you have any questions concerning these Terms
            or other Materials, please contact us through the Crstl website:
            www.crstl.so or at hello@crstl.so
          </li>
        </ol>
      </GenericSubHeading>
    </PaperCard>
  </Wrapper>
);
