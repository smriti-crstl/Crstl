import { ReactElement } from "react";

import HomePageLineGraph from "../../../../components/graphs/LineGraph";
import { WorldMap } from "../../../graphs/WorldMapGraph";
import { useFlags } from "launchdarkly-react-client-sdk";
import { StyledGeoMapWrapper, StyledGraphWrapper } from "../../Section.style";
import { MoneyCalendar } from "../../../MoneyCalendar";

const HomeHrSectionOneVrSectionOne = (): ReactElement => {
  const { worldMap } = useFlags();
  return worldMap ? (
    <>
      <StyledGraphWrapper>
        <HomePageLineGraph />
      </StyledGraphWrapper>
      <StyledGraphWrapper>
        <MoneyCalendar />
      </StyledGraphWrapper>
      <StyledGeoMapWrapper>
        <WorldMap />
      </StyledGeoMapWrapper>
    </>
  ) : (
    <>
      <StyledGraphWrapper>
        <HomePageLineGraph />
      </StyledGraphWrapper>
      <StyledGraphWrapper>
        <MoneyCalendar />
      </StyledGraphWrapper>
    </>
  );
};

export default HomeHrSectionOneVrSectionOne;
