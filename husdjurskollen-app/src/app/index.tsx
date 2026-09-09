import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import Header from "@/components/AppHeader";
import UserForm from "@/components/user/UserForm";

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(Math.max(value, min), max);
}

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  const [showRegister, setShowRegister] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(true);

  /*
   * Storlekarna räknas ut från skärmens höjd.
   * På en liten mobil, t.ex. iPhone SE,
   * blir de mindre automatiskt.
   * På större mobiler växer de mjukt.
   */

  const titleSize = clamp(height * 0.04, 24, 32);

  const pawSize = clamp(height * 0.042, 25, 34);

  const subtitleSize = clamp(
    height * 0.018,
    12,
    15,
  );

  const subtitleLineHeight = clamp(
    height * 0.024,
    16,
    20,
  );

  const heroImageSize = clamp(
    height * 0.145,
    88,
    150,
  );

  const heroImageMargin = clamp(
    height * 0.008,
    2,
    10,
  );

  const cardWidth = Math.min(width * 0.92, 420);

  const cardMarginTop = clamp(
    height * 0.012,
    4,
    14,
  );

  const cardPadding = clamp(
    height * 0.018,
    10,
    18,
  );

  const tabHeight = clamp(height * 0.06, 40, 48);

  const tabMarginBottom = clamp(
    height * 0.018,
    6,
    22,
  );

  const dividerMargin = clamp(
    height * 0.015,
    5,
    18,
  );

  const footerFontSize = clamp(
    height * 0.016,
    11,
    13,
  );

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <SafeAreaView style={styles.startPage}>
      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.startPageContent
        }
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* HERO */}
        <View style={styles.startHero}>
          <View style={styles.startTitleArea}>
            <View
              style={styles.startTitleWithPaw}
            >
              <Text
                style={[
                  styles.startTitle,
                  {
                    fontSize: titleSize,
                    lineHeight: titleSize + 4,
                  },
                ]}
              >
                Husdjurskollen
              </Text>

              <Text
                style={[
                  styles.startTitlePaw,
                  {
                    fontSize: pawSize,
                  },
                ]}
              >
                🐾
              </Text>
            </View>

            <Text
              style={[
                styles.startSubtitle,
                {
                  fontSize: subtitleSize,
                  lineHeight: subtitleLineHeight,
                },
              ]}
            >
              Håll koll på ditt husdjurs vardag,
              {"\n"}
              behov och hälsa.
            </Text>
          </View>

          <Image
            source={require("../../assets/images/Start-Image.jpg")}
            style={[
              styles.startHeroImage,
              {
                width: heroImageSize,
                height: heroImageSize,
                borderRadius: heroImageSize / 2,
                marginTop: heroImageMargin,
              },
            ]}
            resizeMode="cover"
          />
        </View>

        {/* AUTH CARD */}
        <View
          style={[
            styles.authCard,
            {
              width: cardWidth,
              marginTop: cardMarginTop,
              padding: cardPadding,
            },
          ]}
        >
          {/* TABS */}
          <View
            style={[
              styles.authTabs,
              {
                marginBottom: tabMarginBottom,
              },
            ]}
          >
            <Pressable
              onPress={handleLoginClick}
              style={[
                styles.authTabButton,
                {
                  minHeight: tabHeight,
                },
                showLogin &&
                  styles.authTabButtonActive,
              ]}
            >
              <Text style={styles.authTabText}>
                Logga in
              </Text>
            </Pressable>

            <Pressable
              onPress={handleRegisterClick}
              style={[
                styles.authTabButton,
                {
                  minHeight: tabHeight,
                },
                showRegister &&
                  styles.authTabButtonActive,
              ]}
            >
              <Text style={styles.authTabText}>
                Registrera
              </Text>
            </Pressable>
          </View>

          {/* FORM */}
          {showLogin && <UserForm mode="login" />}

          {showRegister && (
            <UserForm mode="register" />
          )}

          {/* DIVIDER */}
          <View
            style={[
              styles.divider,
              {
                marginVertical: dividerMargin,
              },
            ]}
          >
            <View style={styles.dividerLine} />

            <Text style={styles.dividerPaw}>
              🐾
            </Text>

            <View style={styles.dividerLine} />
          </View>

          {/* FOOTER */}
          {showLogin ? (
            <Text
              style={[
                styles.noAccountText,
                {
                  fontSize: footerFontSize,
                },
              ]}
            >
              Har du inget konto?{" "}
              <Text
                style={styles.registerLink}
                onPress={handleRegisterClick}
              >
                Registrera dig!
              </Text>
            </Text>
          ) : (
            <Text
              style={[
                styles.noAccountText,
                {
                  fontSize: footerFontSize,
                },
              ]}
            >
              Skapa ditt konto och kom igång.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  startPage: {
    flex: 1,
    backgroundColor: "#fef9f3",
  },

  scroll: {
    flex: 1,
  },

  startPageContent: {
    alignItems: "center",
    paddingBottom: 4,
  },

  startHero: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  startTitleArea: {
    alignItems: "center",
    justifyContent: "center",
  },

  startTitleWithPaw: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  startTitle: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond",
    fontWeight: "600",
  },

  startTitlePaw: {
    color: "#2d696f",
  },

  startSubtitle: {
    color: "#2d696f",
    textAlign: "center",
    marginTop: 2,
    fontFamily: "Quicksand",
  },

  startHeroImage: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.13,
    shadowRadius: 18,

    elevation: 4,
  },

  authCard: {
    maxWidth: 420,

    marginBottom: 0,
    paddingBottom: 14,

    backgroundColor: "rgba(255,252,248,0.92)",

    borderWidth: 1,
    borderColor: "rgba(45,105,111,0.10)",

    borderRadius: 28,

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 26,

    elevation: 5,
  },

  authTabs: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },

  authTabButton: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,

    backgroundColor: "#f7f4ef",

    borderWidth: 1,
    borderColor: "rgba(45,105,111,0.12)",
  },

  authTabButtonActive: {
    backgroundColor: "#cddecb",
    borderWidth: 2,
    borderColor: "#e0e9dd",
  },

  authTabText: {
    color: "#2d696f",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Quicksand",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(45,105,111,0.12)",
  },

  dividerPaw: {
    fontSize: 15,
    opacity: 0.85,
  },

  noAccountText: {
    textAlign: "center",
    color: "#54615e",
    fontFamily: "Quicksand",
  },

  registerLink: {
    color: "#2d696f",
    fontWeight: "600",
  },
});
