import { Tooltip } from "antd";
import { OrgTPDocType } from "domain/entity/shared/models";
import { useMemo } from "react";
import { useTheme } from "styled-components";

import { TabsConfig } from "components/atoms/tabs";

import { ColorCircle, TabItemContainer } from "../components/edi-tab/styles";

export const useDocumentTypeTabsConfig = (
  documentType: OrgTPDocType[]
): [TabsConfig] => {
  const theme = useTheme();

  const tabsConfig: TabsConfig = useMemo(
    () =>
      documentType?.map((item) => ({
        tab: (
          <>
            <Tooltip
              title={`Form ${!item?.isCompleted ? "incomplete" : "complete"}`}
            >
              <TabItemContainer>
                <ColorCircle
                  style={{
                    backgroundColor: item?.isCompleted
                      ? theme.palette.colors.CHATEAU_GREEN
                      : theme.palette.colors.NEGATIVE_RED,
                  }}
                />
                <div>{item?.label}</div>
              </TabItemContainer>
            </Tooltip>
          </>
        ),
        tabKey: item?.value,
        children: null,
      })),
    [documentType]
  );

  return [tabsConfig];
};

