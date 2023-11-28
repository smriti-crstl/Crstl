import React from "react";
import { Result } from "antd";
import { ColoredButton } from "@crstl/components/atoms/buttons";
import { getWithExpiry, setWithExpiry } from "domain/services/localStorage";

type Props = {
  error: Error;
  componentStack: string | null;
  resetError: () => void;
};

function ErrorFallback({ error, componentStack, resetError }: Props) {
  // Handles failed lazy loading of a JS/CSS chunk.
  React.useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      if (!getWithExpiry("chunk_failed")) {
        setWithExpiry("chunk_failed", "true", 10000);
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <>
      <Result
        status="error"
        title="Something went wrong."
        extra={
          <div>
            <strong>Contact support for assistance.</strong>
            {process.env.NODE_ENV === "development" && (
              <details style={{ whiteSpace: "pre-wrap" }}>
                {error && error.toString()}
                <br />
                {componentStack}
              </details>
            )}
          </div>
        }
      />
      <ColoredButton onClick={resetError}>
        Click here to reset the error!
      </ColoredButton>
    </>
  );
}

export { ErrorFallback };
