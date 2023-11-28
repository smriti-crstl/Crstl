import { Result } from "antd";
import React, { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class RootErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render(): React.ReactNode {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
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
                  {errorInfo?.componentStack}
                </details>
              )}
            </div>
          }
        />
      );
    }
    return children;
  }
}

export default RootErrorBoundary;
