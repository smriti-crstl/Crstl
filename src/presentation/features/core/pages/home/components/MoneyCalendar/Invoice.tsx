import { GenericHeading } from "components/atoms/typography";
import { EllipsedText } from "presentation/utils";
import { ReactElement, useContext } from "react";
import { ThemeContext } from "styled-components";
import {
  DataWrapper,
  LabelWrapper,
  HeadingWrapper,
  DescriptionWrapper,
  ContainerWrapper,
  StyledText,
  Styledlabel,
} from "./MoneyCalendar.style";

type Props = {
  customerName?: string;
  dueDate?: string;
  amount?: string;
  limit?: number;
};
export const MoneyCalendarInvoice = ({
  customerName,
  amount,
  dueDate,
  limit = 17,
}: Props): ReactElement => {
  const theme = useContext(ThemeContext);
  return (
    <ContainerWrapper>
      <HeadingWrapper>
        <GenericHeading
          $alignCenter
          size="XS"
          weight="LIGHT"
          style={{ font: "inter" }}
        >
          {"Expected Incoming Payment"}
        </GenericHeading>
        <GenericHeading
          $alignCenter
          size="SM"
          weight="BOLD"
          style={{
            marginTop: "-15px",
            fontFamily: "inter",
          }}
        >
          {`$${amount}`}
        </GenericHeading>
      </HeadingWrapper>
      <DescriptionWrapper>
        <LabelWrapper>
          {customerName && (
            <Styledlabel style={{ color: theme.palette.colors.BLACK }}>
              By:
            </Styledlabel>
          )}
          {dueDate && (
            <Styledlabel style={{ color: theme.palette.colors.BLACK }}>
              From:
            </Styledlabel>
          )}
        </LabelWrapper>
        <DataWrapper>
          {customerName && (
            <StyledText style={{ color: theme.palette.colors.BLACK }}>
              {EllipsedText(customerName as string, limit)}
            </StyledText>
          )}
          {dueDate && (
            <StyledText style={{ color: theme.palette.colors.BLACK }}>
              {EllipsedText(dueDate as string, limit)}
            </StyledText>
          )}
        </DataWrapper>
      </DescriptionWrapper>
    </ContainerWrapper>
  );
};
