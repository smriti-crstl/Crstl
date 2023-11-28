import styled from "styled-components";
import ChangePositiveIcon from "globals/assets/images/change-positive.png";
import ChangeNegativeIcon from "globals/assets/images/change-negative.png";
import { numberFormatter } from "presentation/utils";

interface Props {
  change: string | number;
}

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ChangeIcon = styled.img({
  width: "15px",
  height: "11px",
  marginRight: "6px",
});

const Change = styled.div<{ color?: string }>(
  {
    display: "flex",
    alignItems: "center",
    marginRight: "4px",
  },
  (props) => ({
    color: props.color,
  })
);

const PositiveChange = ({ change }: { change: string }) => {
  return (
    <Container>
      <Change color="#34A853">
        <ChangeIcon alt="" src={ChangePositiveIcon} />
        {change}%
      </Change>
    </Container>
  );
};

const NegativeChange = ({ change }: { change: string }) => {
  return (
    <Container>
      <Change color="#EB5757">
        <ChangeIcon alt="" src={ChangeNegativeIcon} />
        {change}%
      </Change>
    </Container>
  );
};

const NeutralChange = ({ change }: { change: string }) => {
  return (
    <Container>
      <Change>{change}</Change>
    </Container>
  );
};

const MetricDelta: React.FC<Props> = ({ change: changeProp, children }) => {
  const parsedChange = Number(changeProp);

  if (isNaN(parsedChange)) {
    return <NeutralChange change={changeProp.toString()} />;
  }

  if (!isFinite(parsedChange)) {
    return <NeutralChange change="N/A" />;
  }

  const change = numberFormatter(Math.abs(parsedChange));

  return parsedChange > 0 ? (
    <PositiveChange change={change} />
  ) : (
    <NegativeChange change={change} />
  );
};

export { MetricDelta };
