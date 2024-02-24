import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { useTheme as usePaperTheme } from "react-native-paper";

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // secondary: "#6E6E6E",
    // If primary, text, secondary etc are causing any issues
    // on music side, comment them out until we get time
    // to fix colours
    primary: "#16a34a",
    secondary: "#36a2df",
    text: "white",
    background: "#0c0a09",
    border: "#27272a",

    primaryForeground: "#052e16",
    foregroundMuted: "#71717a",
    dullPrimary: "#1ab0a3",
    previousBackground: "#181a1c",
    card: "#17171c",
    bar: "#11803a",
    barContrast: "#424247",
    redPrimary: "#e11d48",
    redPrimaryForeground: "#fadbe2",
    fadedBackground: "rgba(0, 0, 0, 0.95)",
  },
};

export const useAppTheme = () => {
  return usePaperTheme<typeof theme>();
};

export const PaperProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
