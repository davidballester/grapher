export function customScroll(theme) {
  return {
    overflow: 'auto',
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
  };
}
