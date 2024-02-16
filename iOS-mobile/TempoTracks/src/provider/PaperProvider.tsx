import { MD3DarkTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    secondary: "#6E6E6E",
    primary: "#16a34a",
    primaryForeground: "#052e16",
    foregroundMuted: "#71717a",
    dullPrimary: "#1ab0a3",
    secondary: "#36a2df",
    previousBackground: "#181a1c",
    background: "#0c0a09",
    text: "white",
    border: "#27272a",
    card: "#17171c",
    bar: "#11803a",
    barContrast: "#424247",
  },
};

export const PaperProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
