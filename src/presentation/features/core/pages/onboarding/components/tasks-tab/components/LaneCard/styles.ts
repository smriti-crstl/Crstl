import styled from "styled-components";

export const CardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.colors.ALTO};
  border-radius: 5px;

  cursor: default;
  background-color: ${({ theme }) => theme.palette.background.PRIMARY};
`;

export const CardBody = styled.div`
  padding: 10px 16px;
`;

export const CardFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.colors.ALTO};
  padding: 8px 16px;
`;

interface CardTitleProps {
  toStrikethrough?: boolean;
}

export const CardTitle = styled.div<CardTitleProps>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  text-decoration: ${({ toStrikethrough }) =>
    toStrikethrough ? "line-through" : "none"};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
`;

export const TagChipBase = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;

  padding: 2px 8px;
  border-radius: 30px;
`;

export const ETAChip = styled(TagChipBase)`
  color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  background-color: ${({ theme }) => theme.palette.colors.TITAN_WHITE};
  border: 1px solid
    ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE_FADED};
`;

export const TradingPartnerChip = styled(TagChipBase)`
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  background-color: ${({ theme }) => theme.palette.colors.BLACK_PEARL};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    overflow: visible;
    white-space: normal;
  }
`;

export const CardCreationInfo = styled.div`
  display: flex;
  justify-content: space-between;

  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

export const CompletedTimestampInfo = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;

  color: ${({ theme }) => theme.palette.colors.CHATEAU_GREEN};
`;

export const CompletedTimeStamp = styled.span`
  margin-right: 8px;
`;

