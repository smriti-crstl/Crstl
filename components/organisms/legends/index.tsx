import { ReactElement, Fragment } from "react";
import styled from "styled-components";

const StyledCircleDiv = styled.div`
  padding: 5px;
  margin-right: 6px;
  display: inline-block;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
interface WrapperProps {
  height: number | undefined;
}

const LegendPositionWrapper = styled.div<WrapperProps>`
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const LegendItemText = styled.div`
  font-size: 12px;
  margin: 0;
`;

export const LegendPosition = ({
  data = [],
  label,
  customHeight,
}: any): ReactElement => {
  let count = 0;

  // filtering the first 12 elements in the array
  const labelsToRender = data.slice(0, 12);
  return (
    <LegendPositionWrapper height={customHeight}>
      {labelsToRender?.map((item: any, index: number) => {
        count++;
        return (
          <Fragment key={`${item.label}-${index}`}>
            <LegendItemWrapper>
              <StyledCircleDiv color={item.color} />
              <LegendItemText title={item[label]}>{item[label]}</LegendItemText>
            </LegendItemWrapper>
            {count % 3 === 0 && <br />}
          </Fragment>
        );
      })}
    </LegendPositionWrapper>
  );
};
