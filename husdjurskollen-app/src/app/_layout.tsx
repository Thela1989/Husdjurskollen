import {
  CormorantGaramond_400Regular,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";

import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
} from "@expo-google-fonts/nunito-sans";

import {
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";

import {
  Manrope_400Regular,
  Manrope_500Medium,
} from "@expo-google-fonts/manrope";

import {
  Outfit_400Regular,
  Outfit_500Medium,
} from "@expo-google-fonts/outfit";

import {
  SourceSans3_400Regular,
  SourceSans3_500Medium,
} from "@expo-google-fonts/source-sans-3";

import {
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import {
  Rubik_400Regular,
  Rubik_500Medium,
} from "@expo-google-fonts/rubik";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,

    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,

    Rubik_400Regular,
    Rubik_500Medium,

    NunitoSans_400Regular,
    NunitoSans_500Medium,

    DMSans_400Regular,
    DMSans_500Medium,

    Manrope_400Regular,
    Manrope_500Medium,

    Outfit_400Regular,
    Outfit_500Medium,

    SourceSans3_400Regular,
    SourceSans3_500Medium,

    Inter_400Regular,
    Inter_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
