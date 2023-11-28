import { ReactElement } from "react";
import styled from "styled-components";

import {
  OrgSelectionPlugIn,
  OrgSelectionPlugInProps,
} from "../../plugins/org-selection";

const OrgSelectionContainer = styled.div`
  padding-top: 1.5rem;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  > form {
    width: 80%;
    max-width: 22.5rem;
  }
`;

export const OrgSelection = (props: OrgSelectionPlugInProps): ReactElement => {
  return (
    <OrgSelectionContainer>
      <OrgSelectionPlugIn {...props} />
    </OrgSelectionContainer>
  );
};
