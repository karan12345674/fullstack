import React from "react";

export function Badge({ children, className }) {
  return <span className={`px-2 py-1 rounded bg-gray-200 text-gray-800 ${className}`}>{children}</span>;
}