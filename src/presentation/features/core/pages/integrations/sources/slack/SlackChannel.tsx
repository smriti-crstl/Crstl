import React from "react";
import { SlackChannelInfo } from "./SlackChannelInfo";
import { SlackChannelUpdate } from "./SlackChannelUpdate";

function SlackChannel(): React.ReactElement {
  const [isFormVisible, setFormVisibility] = React.useState<boolean>(false);

  function showForm(): void {
    setFormVisibility(true);
  }

  function hideForm(): void {
    setFormVisibility(false);
  }

  return (
    <>
      {isFormVisible ? (
        <SlackChannelUpdate
          onCancelButtonClick={hideForm}
          onSuccess={hideForm}
        />
      ) : (
        <SlackChannelInfo onChange={showForm} />
      )}
    </>
  );
}

export { SlackChannel };
