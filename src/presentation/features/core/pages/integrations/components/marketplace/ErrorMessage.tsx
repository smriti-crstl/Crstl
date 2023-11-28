import { ErrorContainer } from "./styles";

interface Props {
  title?: string;
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({
  title = "Oops! Some error occurred",
  message = "Please reach out the Crstl team if this error persists",
}) => {
  return (
    <ErrorContainer>
      <h2>{title}</h2>
      <p>{message}</p>
    </ErrorContainer>
  );
};
