import React, { Component, ReactNode } from "react";
import "@components/ErrorBoundary/styles.scss";

interface Props {
  children: ReactNode;
  ErrorComponent: React.ComponentType<{ error: Error }>;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { ErrorComponent, children } = this.props;

    if (error) {
      return <ErrorComponent error={error} />;
    }

    return children;
  }
}

export class ErrorBoundaryStyled extends Component<{ children: ReactNode }, State> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      const refreshPage = () => {
        window.location.reload();
      };
      return (
        <div className="error">
          <p className="error-title">Seems like an error occurred!</p>
          <p className="error-message">{error.message}</p>
          <button className="error-reload" type="submit" onClick={refreshPage}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
