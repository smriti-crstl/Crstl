import { DocumentUpdatedResponseModel } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { Alert } from "antd";
import styled from "styled-components";
import { AlertContainer } from "../InvoicePage.styles";

const MessageContainer = styled.div`
  p {
    margin: 0;
  }
`;

interface Props {
  data?: DocumentUpdatedResponseModel["data"];
}

const defaultMessage = {
  message: "Something went wrong, please try again",
  errors: [],
};

function ErrorMessage({ data }: Props) {
  console.log("data: ", data);
  const { message, errors } = data ?? defaultMessage;

  const errorLines = errors?.map((error) => {
    return <p key={error.message}>{error.message}</p>;
  });

  const messageComponent = (
    <MessageContainer>
      <p>
        <strong>{message}</strong>
      </p>
      {errorLines}
    </MessageContainer>
  );

  return <Alert showIcon message={messageComponent} type="error" closable />;
}

export { ErrorMessage };
