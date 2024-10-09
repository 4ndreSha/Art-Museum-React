import React, { useState } from "react";

import "@components/ErrorComponent/styles.scss";

interface ErrorComponentProps {
  error?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div className="error__container">
      <div className="error__container-message">{error}</div>
    </div>
  );
};

export default ErrorComponent;
