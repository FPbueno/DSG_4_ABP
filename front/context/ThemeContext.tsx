import React, { createContext, useContext, useState } from "react";

interface Theme {
  colors: {
    background: string;
    text: string;
    primary: string;
    card: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  colors: {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#007AFF",
    card: "#F5F5F5",
  },
};

const darkTheme: Theme = {
  colors: {
    background: "#121212",
    text: "#FFFFFF",
    primary: "#0A84FF",
    card: "#1E1E1E",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
