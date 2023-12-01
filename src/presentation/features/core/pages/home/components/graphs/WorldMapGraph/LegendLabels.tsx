import { ReactElement } from "react";
import styled from "styled-components";
import { Paragraph } from "components/atoms/typography";

const Circle = styled.div`
  background-color: ${({ color }) => color};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export const LegendLabels = ({
  label,
  color,
}: {
  label: string;
  color: string;
}): ReactElement => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Circle color={color} />
      <Paragraph style={{ margin: 0, marginLeft: "6px" }}>{label}</Paragraph>
    </div>
  );
};
