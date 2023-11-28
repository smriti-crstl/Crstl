import { ReactComponent as ArrowRight } from "globals/assets/svgs/arrow-right.svg";
import { ReactElement } from "react";

import { StatusModel } from "@crstl/api/src/apis/models/config";
import { Chip } from "@crstl/components/molecules/order-chips/Chip";

import {
  ContainerWrapper,
  IconWrapper,
  StyledDiv,
  ChildWrapper,
} from "./HistoryChips.style";

type Props = {
  prevValue?: string;
  value?: string;
  configDropdownValues: StatusModel[] | undefined;
  prevStatusDescription?: string;
  statusDescription?: string;
};
export const HistoryChips = ({
  prevValue,
  value,
  configDropdownValues,
  prevStatusDescription,
  statusDescription,
}: Props): ReactElement => {
  const valueConfigData = configDropdownValues?.find(
    (item) => item.status === value
  );
  const prevValueConfigData = configDropdownValues?.find(
    (item) => item.status === prevValue
  );

  return (
    <>
      <ContainerWrapper style={{ display: "flex", alignSelf: "center" }}>
        <ChildWrapper>
          <Chip
            {...{
              backgroundColor: prevValueConfigData?.backgroundColor,
              value: prevValue || "",
              textColor: prevValueConfigData?.textColor,
              hideDropdown: true,
              chipWidth: "80%",
            }}
          />
          {(prevStatusDescription || statusDescription) && (
            <StyledDiv>
              <span>{prevStatusDescription}</span>
            </StyledDiv>
          )}
        </ChildWrapper>
        <IconWrapper>
          <ArrowRight />
        </IconWrapper>
        <ChildWrapper>
          <Chip
            {...{
              backgroundColor: valueConfigData?.backgroundColor,
              value: value || "",
              textColor: valueConfigData?.textColor,
              hideDropdown: true,
              chipWidth: "80%",
            }}
          />
          {(prevStatusDescription || statusDescription) && (
            <StyledDiv>
              <span>{statusDescription}</span>
            </StyledDiv>
          )}
        </ChildWrapper>
      </ContainerWrapper>
    </>
  );
};
