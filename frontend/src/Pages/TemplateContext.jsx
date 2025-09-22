import { createContext, useState } from "react";

export const TemplateContext = createContext();

export function TemplateProvider({ children }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}