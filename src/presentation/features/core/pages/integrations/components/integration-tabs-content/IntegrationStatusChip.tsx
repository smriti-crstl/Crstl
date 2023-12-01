import { COLORS } from "globals/themes/default/colors";
import { IntegrationStatusModel } from "models/v1/integration/IntegrationStatus";
import { Chip } from "components/molecules/order-chips/Chip";
import { CORE_INTEGRATIONS } from "globals/configs";
import styled from "styled-components";
import { generatePath, useHistory } from "react-router-dom";

interface Props {
  value: string;
  status: IntegrationStatusModel["currentStatus"];
  integrationType: string;
}

const StatusGreen = {
  color: COLORS.WHITE,
  backgroundColor: COLORS.CHATEAU_GREEN,
};

const StatusYellow: React.CSSProperties = {
  color: COLORS.BLACK,
  backgroundColor: COLORS.LIGHT_YELLOW,
  textDecoration: "underline",
  cursor: "pointer",
};

const StyledButton = styled.button`
  appearance: none;
  border: none;
  padding: 0;
  background: transparent;
`;

function IntegrationStatusChip({ value, status, integrationType }: Props) {
  const history = useHistory();
  const styles = status === "OK" ? StatusGreen : StatusYellow;

  const path = generatePath(CORE_INTEGRATIONS, { type: integrationType });

  const onClick = () => {
    if (status === "OK") {
      return;
    }
    history.push(path);
  };

  return (
    <StyledButton onClick={onClick}>
      <Chip
        value={value}
        chipStyles={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          ...styles,
        }}
        hideDropdown
      />
    </StyledButton>
  );
}

export { IntegrationStatusChip };
