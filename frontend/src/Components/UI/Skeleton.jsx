import React from "react";

export const Skeleton = ({ width = "100%", height = "20px", className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{ width, height, borderRadius: "4px" }}
    />
  );
};