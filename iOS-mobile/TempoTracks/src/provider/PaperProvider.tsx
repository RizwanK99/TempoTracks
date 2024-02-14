import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    secondary: '#6E6E6E',
  },
};

export const PaperProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
