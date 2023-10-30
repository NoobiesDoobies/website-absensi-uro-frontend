import { React, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = ({ color, loading }) => {
  const override = {

  };
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingSpinner;
