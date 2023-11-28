import { Collapse } from "antd";
import { ReactComponent as ArrowDown } from "globals/assets/svgs/arrow-down.svg";
import { ReactComponent as ArrowUp } from "globals/assets/svgs/arrow-up.svg";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { StyledCollapse } from "@crstl/components/atoms/collapse";

import { RenderIcons } from "./RenderIcons";

const { Panel } = Collapse;

const PRIMARY_COLOR = "#0012A6";
const PRIMARY_COLOR_LIGHT = "#0012A630";
const ARROW_GRAY = "#808080";
const ICON_GRAY = "#323232";

const ArrowWrapper = styled.div`
  border-radius: 50%;
  height: 29px;
  width: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type IconProps = {
  $isActive: boolean;
};

const IconsWrapper = styled.div<IconProps>`
  fill: ${({ $isActive }) => ($isActive ? PRIMARY_COLOR : ICON_GRAY)};
  display: inline-flex;
  margin-right: 1rem;
`;

const StyledArrowUp = styled(ArrowUp)<IconProps>`
  fill: ${({ $isActive }) => ($isActive ? PRIMARY_COLOR : ARROW_GRAY)};
`;

const StyledArrowDown = styled(ArrowDown)<IconProps>`
  fill: ${({ $isActive }) => ($isActive ? PRIMARY_COLOR : ARROW_GRAY)};
`;

type Props = {
  children: ReactNode;
  heading: string;
  inclusionKey: number | string;
  activeKeys: Array<string>;
  setKeys: React.Dispatch<React.SetStateAction<string[]>>;
};

export const OrderCollapse = ({
  children,
  heading,
  activeKeys,
  // index for active keys
  inclusionKey,
  setKeys,
}: Props): ReactElement => {
  const isActive = activeKeys.includes(String(inclusionKey));
  return (
    <StyledCollapse
      style={{ width: "100%" }}
      key={heading}
      expandIcon={() => (
        <div
          style={{
            padding: 0,
            margin: 0,
            top: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowWrapper
            style={{ backgroundColor: isActive ? PRIMARY_COLOR_LIGHT : "" }}
          >
            {isActive ? (
              <StyledArrowUp $isActive={isActive} />
            ) : (
              <StyledArrowDown $isActive={isActive} />
            )}
          </ArrowWrapper>
        </div>
      )}
      expandIconPosition="right"
      activeKey={activeKeys}
      onChange={(keys) => {
        setKeys(Array.isArray(keys) ? keys : [keys]);
      }}
      $isActive={isActive}
    >
      <Panel
        header={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: isActive ? PRIMARY_COLOR : "inherit",
              fontWeight: 500,
            }}
          >
            <IconsWrapper $isActive={isActive}>
              <RenderIcons type={String(inclusionKey)} />
            </IconsWrapper>
            {heading}
          </div>
        }
        key={inclusionKey}
      >
        {children}
      </Panel>
    </StyledCollapse>
  );
};
