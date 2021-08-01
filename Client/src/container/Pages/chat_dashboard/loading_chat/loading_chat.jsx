import React from "react";
import './loading_chat.css';

const LoadingChat = () => {
  return (
    <>
    <div className="text-center loadingFull">
      <div className="spinner-border text-primary fast" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    </>
  );
}

export default LoadingChat;