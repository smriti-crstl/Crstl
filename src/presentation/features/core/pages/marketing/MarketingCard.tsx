import { AdwordsModel } from "@crstl/api/src/apis/models/v1/AdwordsModel";
import { currencyFormatter, numberFormatter } from "presentation/utils";
import styled from "styled-components";

interface ContainerProps {
  borderColor?: string;
  currency?: string;
}

interface Props extends Omit<AdwordsModel, "borderColor">, ContainerProps {}

const MarketingCardsGrid = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-flow: row;
  grid-column-gap: 24px;
  grid-row-gap: 21px;

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1300px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Container = styled.div<ContainerProps>(
  {
    borderRadius: "10px",
    backgroundColor: "transparent",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  (props) => ({
    border: `2px solid ${props.borderColor}`,
  })
);

const Title = styled.h4({
  fontSize: "18px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  fontWeight: 500,
  color: "black",
  marginBottom: "18px",
});

const Value = styled.p({
  fontSize: "30px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  fontWeight: 500,
  color: "black",
  marginBottom: "14px",
  backgroundColor: "white",
  borderRadius: "32px",
  padding: "16px 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function formatValue(
  value: number,
  format?: string,
  currency?: string
): string {
  if (format === "currency") {
    return currencyFormatter(value, currency);
  }
  if (format === "percentage") {
    return `${value}%`;
  }
  return numberFormatter(value);
}

const MarketingCard: React.FC<Props> = ({
  children,
  label,
  value: valueProp,
  borderColor,
  format,
  currency,
}) => {
  const safeValue = valueProp ?? 0;
  const value = formatValue(safeValue, format, currency);

  return (
    <Container borderColor={borderColor}>
      <Title>{label}</Title>
      <Value>{value}</Value>
      {children}
    </Container>
  );
};

export { MarketingCard, MarketingCardsGrid };
