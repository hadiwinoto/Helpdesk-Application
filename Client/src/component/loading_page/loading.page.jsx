import React from "react";
import './loading.page.css';

const SpinnerPageFull = () => {
  return (
    <>
    <div className="text-center loadingFull">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    </>
  );
}

export default SpinnerPageFull;