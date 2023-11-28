import styled from "styled-components";

const StyledGraphWrapper = styled.div`
  height: 640px;
  margin-right: 1rem;
  padding: 1rem;
  max-width: 722px;
  margin-bottom: 50px;
  border: ${(props) => `1px solid ${props.theme.palette.colors.WHITE_SMOKE}`};
  background-color: ${(props) => props.theme.palette.background.PRIMARY};
`;

const StyledGeoMapWrapper = styled.div`
  width: 675px;
  height: 501px;
  padding: 1rem;
  margin-bottom: 50px;
  border: ${(props) => `1px solid ${props.theme.palette.colors.WHITE_SMOKE}`};
  background-color: ${(props) => props.theme.palette.background.PRIMARY};
`;

export { StyledGeoMapWrapper, StyledGraphWrapper };
