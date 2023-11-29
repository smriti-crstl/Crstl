import { Result } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

interface ResultStyledProps {
  padding?: number;
}

const StyledResult = styled(Result)<ResultStyledProps>`
  width: 100%;
  padding: ${(props) => `${props.padding}px`};
`;
type Props = {
  text?: string;
  padding?: number;
};

export const GenericError = ({ text, padding }: Props): ReactElement => {
  return (
    <StyledResult
      padding={padding}
      status="warning"
      title="Error"
      subTitle={text || "Something went wrong"}
    />
  );
};
