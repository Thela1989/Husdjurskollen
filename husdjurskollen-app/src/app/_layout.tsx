import {
  CormorantGaramond_400Regular,
  CormorantGaramond_600SemiBold,
  useFonts as useCormorantFonts,
} from "@expo-google-fonts/cormorant-garamond";

import {
  Quicksand_400Regular,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  useFonts as useQuicksandFonts,
} from "@expo-google-fonts/quicksand";

import { Stack } from "expo-router";

export default function RootLayout() {
  const [cormorantLoaded] = useCormorantFonts({
    CormorantGaramond:
      CormorantGaramond_400Regular,
    CormorantGaramondSemiBold:
      CormorantGaramond_600SemiBold,
  });

  const [quicksandLoaded] = useQuicksandFonts({
    Quicksand: Quicksand_400Regular,
    QuicksandSemiBold: Quicksand_600SemiBold,
    QuicksandBold: Quicksand_700Bold,
  });

  if (!cormorantLoaded || !quicksandLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}
    />
  );
}
