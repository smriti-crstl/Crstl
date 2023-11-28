import { ReactElement, useState, useLayoutEffect } from "react";
import { Divider, Select, Button } from "antd";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { SimpleCheckbox } from "@crstl/components/atoms/checkbox";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { GeoMap } from "./GeoMap";
import { LegendLabels } from "./LegendLabels";
import { SubParagraph } from "@crstl/components/atoms/typography/paragraph/subParagraph";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { GEOMAP_MARKER_MOCK, MarkerProp } from "../../../mocks";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 77px;
  align-items: center;
`;

const StyledFooterContent = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
`;

const LegendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCheckbox = styled(SimpleCheckbox)`
  font-family: Inter;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  font-size: 16px;
  font-family: Roboto;
  border-radius: 7px;
  && .ant-select-selector {
    border-radius: 7px;
  }
`;

const StyledButton = styled(Button)`
  box-shadow: none !important;
  :disabled {
    background: white !important;
    color: #bebebe;
  }
`;

export const WorldMap = (): ReactElement => {
  const { getZonedTime } = useTimestamp();
  const { Option } = Select;
  const [tooltipContent, setTooltipContent] = useState("");
  const [isB2BSelected, setIsB2BSelected] = useState(true);
  const [isDTCSelected, setIsDTCSelected] = useState(false);
  const [merkerData, setMarkerData] = useState<MarkerProp[]>([]);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = (): void => {
    if (position.zoom >= 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = (): void => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  useLayoutEffect(() => {
    const marker: MarkerProp[] = [];
    ReactTooltip.rebuild();
    if (isB2BSelected) {
      marker.push(...GEOMAP_MARKER_MOCK.B2B);
      setMarkerData(marker);
    }
    if (isDTCSelected) {
      marker.push(...GEOMAP_MARKER_MOCK.DTC);
      setMarkerData(marker);
    }
    if (!isB2BSelected && !isDTCSelected) {
      setMarkerData([]);
    }
  }, [isB2BSelected, isDTCSelected, tooltipContent]);

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div>
          <SubParagraph
            fontFamily="Inter"
            style={{ fontSize: "16px", marginBottom: 0 }}
          >
            Current Time:&nbsp;{" "}
            {getZonedTime({
              ISODateString: new Date().toISOString(),
              withAltLabel: true,
            })}
          </SubParagraph>
        </div>
        <div>
          <SubParagraph
            fontFamily="Inter"
            style={{
              color: "#0012A6",
              fontSize: "16px",
              marginBottom: 0,
              cursor: "pointer",
            }}
          >
            Expand
          </SubParagraph>
        </div>
      </div>

      <GeoMap
        setTooltipContent={setTooltipContent}
        position={position}
        setPosition={setPosition}
        markers={merkerData}
      />
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <Divider style={{ marginBottom: 0 }} />

      <FooterWrapper>
        <LegendsWrapper>
          <StyledCheckbox
            onChange={(event) => setIsB2BSelected(event.target.checked)}
            style={{ marginLeft: "8.5px" }}
            defaultChecked
          >
            {<LegendLabels label="B2B Customers" color="#1890FF" />}
          </StyledCheckbox>
          <StyledCheckbox
            onChange={(event) => setIsDTCSelected(event.target.checked)}
          >
            {<LegendLabels label="DTC Customers" color="#FF781E" />}
          </StyledCheckbox>
          <StyledCheckbox>
            {<LegendLabels label="Fulfillment Centers" color="#722ED1" />}
          </StyledCheckbox>
        </LegendsWrapper>

        <StyledFooterContent>
          <StyledSelect size="large" defaultValue="World Map">
            <Option key={1} value="World Map">
              World Map
            </Option>
          </StyledSelect>

          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "7px",
              marginLeft: "4px",
            }}
          >
            <StyledButton
              size="large"
              style={{ border: "none", borderRadius: "7px", boxShadow: "none" }}
              onClick={handleZoomOut}
              disabled={position.zoom <= 1}
            >
              {<MinusOutlined style={{ fontSize: "12px" }} />}
            </StyledButton>
            <Divider type="vertical" style={{ margin: 0, height: "28px" }} />
            <StyledButton
              size="large"
              style={{ border: "none", borderRadius: "7px", boxShadow: "none" }}
              onClick={handleZoomIn}
              disabled={position.zoom >= 8}
            >
              {<PlusOutlined style={{ fontSize: "12px" }} />}
            </StyledButton>
          </div>
        </StyledFooterContent>
      </FooterWrapper>
    </div>
  );
};
