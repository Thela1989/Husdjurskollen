import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Header from "@/components/Header";
import UserForm from "@/components/user/UserForm";

export default function HomeScreen() {
  const [showRegister, setShowRegister] =
    useState(false);
  const [showLogin, setShowLogin] =
    useState(true);

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
        contentContainerStyle={
          styles.startPageContent
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.startHero}>
          <View style={styles.startTitleArea}>
            <View
              style={styles.startTitleWithPaw}
            >
              <Text style={styles.startTitle}>
                Husdjurskollen
              </Text>

              <Text style={styles.startTitlePaw}>
                🐾
              </Text>
            </View>

            <Text style={styles.startSubtitle}>
              Håll koll på ditt husdjurs vardag,
              {"\n"}
              behov och hälsa.
            </Text>
          </View>

          <Image
            source={require("../../assets/images/Start-Image.jpg")}
            style={styles.startHeroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.authCard}>
          <View style={styles.authTabs}>
            <Pressable
              onPress={handleLoginClick}
              style={[
                styles.authTabButton,
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
                showRegister &&
                  styles.authTabButtonActive,
              ]}
            >
              <Text style={styles.authTabText}>
                Registrera
              </Text>
            </Pressable>
          </View>

          {showLogin && <UserForm mode="login" />}

          {showRegister && (
            <UserForm mode="register" />
          )}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerPaw}>
              🐾
            </Text>

            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.noAccountText}>
            Har du inget konto?{" "}
            <Text
              style={styles.registerLink}
              onPress={handleRegisterClick}
            >
              Registrera dig!
            </Text>
          </Text>
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

  startPageContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 32,
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
    gap: 8,
  },

  startTitle: {
    color: "#2d696f",
    fontSize: 32,
    fontWeight: "600",
  },

  startTitlePaw: {
    color: "#2d696f",
    fontSize: 34,
  },

  startSubtitle: {
    color: "#2d696f",
    textAlign: "center",
    marginTop: 4,
    fontSize: 15,
    lineHeight: 20,
  },

  startHeroImage: {
    width: 165,
    height: 165,
    borderRadius: 82.5,
    marginTop: 10,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 25,

    elevation: 5,
  },

  authCard: {
    width: "92%",
    maxWidth: 520,
    marginTop: 14,
    marginBottom: 20,
    padding: 18,
    backgroundColor: "rgba(255,252,248,0.92)",
    borderWidth: 1,
    borderColor: "rgba(45,105,111,0.10)",
    borderRadius: 28,

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.14,
    shadowRadius: 34,

    elevation: 6,
  },

  authTabs: {
    width: "100%",
    flexDirection: "row",
    gap: 14,
    marginBottom: 22,
  },

  authTabButton: {
    flex: 1,
    minHeight: 48,

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
    fontSize: 14,
    fontWeight: "700",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(45,105,111,0.12)",
  },

  dividerPaw: {
    color: "#2d696f",
    fontSize: 18,
    opacity: 0.85,
  },

  noAccountText: {
    textAlign: "center",
    color: "#54615e",
    fontSize: 15,
  },

  registerLink: {
    color: "#2d696f",
    fontWeight: "600",
  },
});
