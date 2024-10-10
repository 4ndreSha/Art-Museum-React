import React, { useState } from "react";

import "@components/ErrorComponent/styles.scss";

interface ErrorComponentProps {
  error?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div className="error__container">
      <p className="error__container-title">Whoops, an error!</p>
      <div className="error__container-message">{error}</div>
    </div>
  );
};

export default ErrorComponent;
