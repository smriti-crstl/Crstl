import { useFlags } from "launchdarkly-react-client-sdk";
import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";
import { PageWrapper, PageContainer } from "components/molecules/page";
import { GoogleAdMetricsTrend } from "./components/GoogleAdMetricsTrend";
import { GoogleAdMetrics } from "./components/GoogleAdMetrics";
import styled from "styled-components";
import { IndividualGoogleAdMetricsSection } from "./sections/IndividualGoogleAdMetricsSection";

const ComponentContainer = styled.div`
  margin-bottom: 24px;
`;

function MarketingPage() {
  const flags = useFlags();
  return (
    <div>
      <HeaderShadowContainerWithoutTabs />
      <PageWrapper>
        <PageContainer>
          {flags.googleAdsMetrics && (
            <ComponentContainer>
              <GoogleAdMetrics />
            </ComponentContainer>
          )}
          {flags.googleAdsMetricsTrend && (
            <ComponentContainer>
              <GoogleAdMetricsTrend />
            </ComponentContainer>
          )}
          {flags.googleAdsMetricsTrend && <IndividualGoogleAdMetricsSection />}
        </PageContainer>
      </PageWrapper>
    </div>
  );
}

export { MarketingPage };
