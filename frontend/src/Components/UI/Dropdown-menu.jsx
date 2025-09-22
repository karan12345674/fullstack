import React from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block text-left">{children}</div>;
}

export function DropdownMenuTrigger({ children }) {
  return <button>{children}</button>;
}

export function DropdownMenuContent({ children }) {
  return <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md">{children}</div>;
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}