import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple, amber, brown } from '@material-ui/core/colors';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
    secondary: brown,
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: purple,
    secondary: amber,
  },
});

export default function CustomThemeProvider({ isDarkMode, children }) {
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{children}</CssBaseline>
    </ThemeProvider>
  );
}
