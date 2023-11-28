/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row } from "antd";
import { ReactComponent as FinanceLogo } from "globals/assets/svgs/finance_logo.svg";
import { INTEGRATION_MAP } from "presentation/constants/Integration";
import { ReactElement } from "react";
import styled from "styled-components";

import { IntegrationTypeModel } from "@crstl/api/src/apis/models/Integration";
import { ShrinkTag, StatusTag } from "@crstl/components/atoms/tags";

import { CallToAction } from "./CallToAction";
import { IntegrationMetaData } from "./IntegrationMetaData";

const ImageWrapper = styled.span`
  display: flex;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  img {
    display: block;
    max-width: 100%;
  }
`;

const ListElementWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.LARGE};
  :not(:last-child) {
    border-bottom: solid 1px #e5e5e5;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IntegrationHeader = styled.div`
  display: flex;
  align-items: center;
`;

const IntegrationName = styled.div`
  font-size: 18px;
  margin-right: 20px;
`;

const CTAWrapper = styled.div`
  text-align: end;
`;

export interface IIntegrationsListElementProps {
  onAddButtonClick: (integrationId: string) => void;
  createdBy?: string;
  createdAt?: string;
  isLoading: boolean;
  imageUrl: string;
  name: string;
  integrationType: IntegrationTypeModel;
  isConnected: boolean;
  id: string;
  ctaButtonText?: string;
  customSpanValues?: {
    image?: number;
    text?: number;
    ctaButton?: number;
  };
  CustomCallbackElement?: ReactElement;
  lastReAuthedAt: string;
  lastReAuthedBy: string;
  assistedIntegration: boolean;
}

export const IntegrationsListElement: React.FC<IIntegrationsListElementProps> = ({
  // description,
  createdBy,
  createdAt,
  lastReAuthedBy,
  lastReAuthedAt,
  imageUrl,
  name,
  integrationType,
  isConnected,
  id,
  onAddButtonClick,
  isLoading,
  ctaButtonText,
  customSpanValues,
  CustomCallbackElement,
  children,
  assistedIntegration,
}): ReactElement => {
  return (
    <ListElementWrapper>
      <StatusTag tagKey="Current status" status="To Do" />
      <Row
        align="middle"
        justify="space-between"
        wrap={false}
        data-testid={name}
      >
        {imageUrl && (
          <Col flex="150px" style={{ textAlign: "center" }}>
            <ImageWrapper>
              <img src={imageUrl} alt={name} />
            </ImageWrapper>
          </Col>
        )}
        {!imageUrl && integrationType === "Finance" && (
          <Col flex="150px" style={{ textAlign: "center" }}>
            <ImageWrapper>
              <FinanceLogo />
            </ImageWrapper>
          </Col>
        )}
        <Col
          flex="auto"
          style={{
            minHeight: "5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ContentWrapper>
            <IntegrationHeader>
              <IntegrationName>{name}</IntegrationName>
              {/* <span>{description}</span> */}
              {/* // ! Note: temp hiding the "collaboration"-like tag */}
              {/* <ShrinkTag>
                {INTEGRATION_MAP[integrationType] || integrationType}
              </ShrinkTag> */}
            </IntegrationHeader>
            <IntegrationMetaData
              createdAt={createdAt}
              createdBy={createdBy}
              lastReAuthedBy={lastReAuthedBy}
              lastReAuthedAt={lastReAuthedAt}
            />
            {children}
          </ContentWrapper>
        </Col>
        <Col span={0}>
          {/* {name === "Shopify" ? <ShopifyInstructions /> : null} */}
        </Col>
        <Col flex="110px">
          <CTAWrapper>
            {CustomCallbackElement ? (
              CustomCallbackElement
            ) : (
              <CallToAction
                name={name}
                isConnected={isConnected}
                isLoading={isLoading}
                ctaButtonText={ctaButtonText}
                onClick={() => onAddButtonClick(id)}
                assistedIntegration={assistedIntegration}
              />
            )}
            {/* {isConnected ? (
              <ConnectedIndicator />
            ) : CustomCallbackElement ? (
              CustomCallbackElement
            ) : (
              <ColoredButton
                loading={isLoading}
                onClick={() => onAddButtonClick(id)}
              >
                {ctaButtonText ||
                  CORE_INTEGRATIONS_TEXT_CONSTANTS.CTA_BUTTON.TEXT}
              </ColoredButton>
            )} */}
          </CTAWrapper>
        </Col>
      </Row>
    </ListElementWrapper>
  );
};

