import { Button } from "antd";
import { useGetSlackRecipient } from "domain/interactors/integrations";
import { head } from "lodash";
import React from "react";
import styled from "styled-components";
import { SLACK_CONFIG } from "./slack.config";

type Props = {
  onChange: (e?: React.MouseEvent) => void;
};

const StyledButton = styled(Button)`
  width: 150px;
`;

const InlineButton = styled(Button)`
  display: "inline-block";
  padding: 0;
`;

function SlackChannelInfo({ onChange }: Props): React.ReactElement {
  const { data, isLoading, isError } = useGetSlackRecipient();

  if (isLoading) {
    return <p>{SLACK_CONFIG.LOADING}</p>;
  }

  if (isError) {
    return (
      <p>
        {SLACK_CONFIG.SLACK_INFO_ERROR_MESSAGE} Click{" "}
        <InlineButton type="link" onClick={onChange}>
          here
        </InlineButton>{" "}
        to try again
      </p>
    );
  }

  const channelName = head(data)?.name;

  if (!channelName) {
    return (
      <StyledButton type="primary" onClick={onChange}>
        {SLACK_CONFIG.SET_CHANNEL}
      </StyledButton>
    );
  }

  return (
    <p>
      {SLACK_CONFIG.RECEIVING_ALERTS_LABEL} <strong>{channelName}</strong>{" "}
    </p>
  );
}

export { SlackChannelInfo };
