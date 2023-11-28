import { DATA_TOUR_IDS } from "boot/wrappers/react-joyride/constants";
import { amplitude } from "presentation/utils";
import React from "react";
import { useParams } from "react-router-dom";

import {
  CheckOutlined,
  FileExclamationOutlined,
  FileOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  RocketOutlined,
  WarningOutlined
} from "@ant-design/icons";

import { OrderCountSummaryObject } from "../EdiListViewPage.types";
import {
  Count,
  Icon,
  IconArea,
  LeftSection,
  RightSection,
  Status,
  SummaryContainer,
  Tab,
  TabSection
} from "./EdiSummaryTabs.styles";

const TabIconMap: Record<string, React.ReactElement> = {
  new: <FileOutlined />,
  open: <FolderOpenOutlined />,
  asn_pending: <RocketOutlined />,
  invoice_pending: <FileTextOutlined />,
  completed: <CheckOutlined />,
  po_change: <FileExclamationOutlined />,
  errors: <WarningOutlined />,
};

const extraStyles: Record<string, Record<string, string>> = {
  new: {
    hoverBg: "#F3A18F",
    activeBg: "rgba(249, 208, 199, 0.5)",
  },
  open: {
    hoverBg: "#f9e7ae",
    activeBg: "#fdfbf1",
  },
  po_change: {
    hoverBg: "#F3A18F",
    activeBg: "rgba(249, 208, 199, 0.5)",
  },
  asn_pending: {
    hoverBg: "#f9e7ae",
    activeBg: "#fdfbf1",
  },
  invoice_pending: {
    hoverBg: "#f9e7ae",
    activeBg: "#fdfbf1",
  },
  completed: {
    hoverBg: "#b5dfc1",
    activeBg: "#edf7f0",
  },
  errors: {
    hoverBg: "#F3A18F",
    activeBg: "rgba(249, 208, 199, 0.5)",
  },
};

function getPoChangeStyles(backgroundColor: string) {
  if (backgroundColor === "rgba(231, 244, 255, 1)") {
    return {
      hoverBg: "rgba(173, 228, 255, 1)",
      activeBg: "rgba(231, 244, 255, 0.5)",
    };
  }
  const defaultPoChangeStyles = extraStyles["po_change"];
  return defaultPoChangeStyles;
}

function getNewPOStyles(backgroundColor: string) {
  if (backgroundColor === "rgba(231, 244, 255, 1)") {
    return {
      hoverBg: "rgba(173, 228, 255, 1)",
      activeBg: "rgba(231, 244, 255, 0.5)",
    };
  }
  const defaultNewPOStyles = extraStyles["new"];
  return defaultNewPOStyles;
}

const EDISummaryTabs = ({
  tabsData,
  onClick,
}: {
  tabsData?: OrderCountSummaryObject[];
  onClick?: any;
}) => {
  const { type } = useParams<{
    type: string;
  }>();
  return (
    <SummaryContainer id={DATA_TOUR_IDS.TRANSACTION_FILTER}>
      {tabsData?.map((tab) => {
        const isActive = type === tab.id;
        const isPoChange = tab.id === "po_change";
        const isNew = tab.id === "new";
        const styles = isPoChange
          ? getPoChangeStyles(tab.color.backgroundColor)
          : isNew
          ? getNewPOStyles(tab.color.backgroundColor)
          : extraStyles[tab.id];
        return (
          <Tab
            className="-edi-flex-tab"
            key={tab.id}
            bgColor={tab.color.backgroundColor}
            isActive={isActive}
            {...styles}
          >
            <TabSection
              onClick={() => {
                amplitude.logClickEvent(`Summary Tile: ${tab.label}`, {
                  count: tab.count,
                });
                onClick(tab.id);
              }}
            >
              <RightSection>
                <Count>{tab.count}</Count>
              </RightSection>
              <LeftSection>
                <IconArea bgColor={tab.color.iconBackground}>
                  <Icon>{TabIconMap[tab.id]}</Icon>
                </IconArea>
                <Status textColor={tab.color.textColor}>{tab.label}</Status>
              </LeftSection>
            </TabSection>
          </Tab>
        );
      })}
    </SummaryContainer>
  );
};

export default EDISummaryTabs;

