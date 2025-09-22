import React, { createContext, useContext, useState } from "react";

// Sidebar Context
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarTrigger = ({ children }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <button onClick={toggleSidebar}>
      {children || "Toggle Sidebar"}
    </button>
  );
};

export const useSidebar = () => useContext(SidebarContext);

// Dummy components for Layout usage
export const Sidebar = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarContent = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarGroup = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarGroupContent = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarGroupLabel = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarMenu = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarMenuButton = ({ children, className, asChild }) => asChild ? children : <button className={className}>{children}</button>;
export const SidebarMenuItem = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarHeader = ({ children, className }) => <div className={className}>{children}</div>;
export const SidebarFooter = ({ children, className }) => <div className={className}>{children}</div>;