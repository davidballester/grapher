import React, { useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DarkModeIcon from '@material-ui/icons/Brightness3';
import LightModeIcon from '@material-ui/icons/Brightness7';

export default function ThemeToggler({ isDarkMode, isInitialized, toggleTheme, initializeTheme }) {
  const darkModeBySystemPreferences = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    if (!isInitialized) {
      initializeTheme(darkModeBySystemPreferences);
    }
  }, [isInitialized, initializeTheme, darkModeBySystemPreferences]);
  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="Dark mode toggler">
      {isDarkMode && <LightModeIcon />}
      {!isDarkMode && <DarkModeIcon />}
    </IconButton>
  );
}
