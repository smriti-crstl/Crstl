import { FunctionComponent } from "react";
import styled from "styled-components";

const PieDataInfoContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const PieDataInfo = styled.div`
  width: 150px;
  text-align: center;

  .value,
  .label {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .value {
    font-weight: bold;
    font-size: 24px;
  }

  .label {
    font-size: 10px;
  }
`;

type Props = {
  value?: string | null;
  label?: string | null;
};

const PieChartInfo: FunctionComponent<Props> = ({ value, label }: Props) => {
  return value ? (
    <PieDataInfoContainer>
      <PieDataInfo>
        <h4 className="value">{value}</h4>
        <p className="label">{label}</p>
      </PieDataInfo>
    </PieDataInfoContainer>
  ) : null;
};

export { PieChartInfo };
