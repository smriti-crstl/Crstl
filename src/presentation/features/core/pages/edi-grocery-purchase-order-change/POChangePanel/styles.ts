import { Button } from "antd";
import { PostPOChangeStateReq } from "domain/entity/edi/models";
import styled from "styled-components";

const POChangeDocsListContainer = styled.div`
  margin-bottom: 20px;
  height: 135px;
  border-radius: 16px;
`;

const POChangeDocsPaginationContainer = styled.div`
  width: 150px;
  float: right;
  margin-top: -3.8em;
`;

const POChangeDocMetadataContainer = styled.div`
  border-radius: 16px;
`;

const POChangeDocNewStateContainer = styled.div`
  height: 135px;
  background: rgba(246, 249, 253, 1);
  border-radius: 16px;
  text-align: center;
`;

const POEmojiContainer = styled.div`
  font-size: 20px;
`;

const POChangeDocInvalidStateContainer = styled(POChangeDocNewStateContainer)`
  height: auto;
  min-height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 40px;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
  }
`;

interface ContainerProps {
  state: PostPOChangeStateReq["newValue"];
}

const POChangeStateContainer = styled.div<ContainerProps>`
  height: 83px;
  background: ${({ state }) =>
    state === "Accepted" ? "rgba(52, 168, 83, 0.1)" : "rgba(255, 239, 239, 1)"};
  text-align: center;
  border-radius: 16px;
`;

const POChangeDocStateLabel = styled.label`
  position: relative;
  top: 35%;
`;

const POChangeDocNewStateTextPrompt = styled.label`
  position: relative;
  top: 15%;
`;

const POChangeDocNewStateButtonsContainer = styled.div`
  position: relative;
  top: 30%;
  margin-left: 200px;
  margin-right: 200px;
`;

const AcceptButton = styled(Button)`
  height: 42px;
  width: 126px;
  color: ${({ theme }) => theme.palette.colors.WHITE};
  background-color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.colors.WHITE};
    background-color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  }

  &:disabled {
    background-color: ${({ theme }) =>
      theme.palette.colors.ULTRAMARINE_BLUE_FADED};
    cursor: not-allowed;
  }
`;

const RejectButton = styled(Button)`
  height: 42px;
  width: 126px;
  color: ${({ theme }) => theme.palette.colors.BLACK};
  background-color: ${({ theme }) => theme.palette.colors.WHITE};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.colors.BLACK};
    background-color: ${({ theme }) => theme.palette.colors.WHITE};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.colors.WHITE_FADED};
    cursor: not-allowed;
  }
`;

export {
  POChangeDocsListContainer,
  POChangeDocsPaginationContainer,
  POChangeDocMetadataContainer,
  POChangeDocNewStateContainer,
  POChangeStateContainer,
  POChangeDocStateLabel,
  POChangeDocNewStateTextPrompt,
  POChangeDocNewStateButtonsContainer,
  POChangeDocInvalidStateContainer,
  POEmojiContainer,
  AcceptButton,
  RejectButton,
};

