import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
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

const customScroll = (theme) => ({
  '& *': {
    'scrollbar-width': 'thin',
    'scrollbar-color': `${theme.palette.text.primary} ${theme.palette.background.paper}`,
    '&::-webkit-scrollbar': {
      width: 11,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.background.paper,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.text.primary,
      borderRadius: 6,
      border: `3px solid ${theme.palette.background.paper}`,
    },
  },
});

export default function CustomThemeProvider({ isDarkMode, children }) {
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
  // Terribe hack to avoid memoization of the theme selection.
  const classes = makeStyles(() => ({
    customScroll: customScroll(theme),
  }))();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div id="css-root" className={classes.customScroll}>
          {children}
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}
