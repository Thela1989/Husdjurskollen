import {
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { supabase } from "@/lib/supabase";
// ImageUploader kopplar vi tillbaka direkt efter att
// den komponenten migrerats till React Native.

interface Props {
  mode: "register" | "login" | "edit";
  onEditDone?: () => void;
  onRegisterDone?: () => void;
  name?: string;
  email?: string;
}

export default function UserForm({
  mode,
  onEditDone,
  onRegisterDone,
  name = "",
  email = "",
}: Props) {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const isSmallScreen = height <= 700;

  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] =
    useState(email);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (mode === "register") {
        const { error } =
          await supabase.auth.signUp({
            email: formEmail,
            password,
            options: {
              data: {
                name: formName,
              },
            },
          });

        if (error) throw error;

        onRegisterDone?.();
      }

      if (mode === "login") {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: formEmail,
            password,
          });

        if (error) throw error;

        setMessage("Inloggad ✅");
      }

      if (mode === "edit") {
        const { error } =
          await supabase.auth.updateUser({
            email: formEmail,
            data: {
              name: formName,
            },
          });

        if (error) throw error;

        setMessage("Användare uppdaterad ✅");
        onEditDone?.();
      }
    } catch (error) {
      console.error(error);
      setMessage("Något gick fel ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.form,
        isSmallScreen && styles.formSmall,
      ]}
    >
      <Text
        style={[
          styles.heading,
          isSmallScreen && styles.headingSmall,
        ]}
      >
        {mode === "register" && "Registrera"}
        {mode === "login" && "Logga in"}
        {mode === "edit" && "Redigera användare"}
      </Text>

      {mode !== "login" && (
        <View style={styles.field}>
          <Text style={styles.label}>Namn</Text>

          <TextInput
            value={formName}
            onChangeText={setFormName}
            style={[
              styles.input,
              isSmallScreen && styles.inputSmall,
            ]}
            placeholderTextColor="#9a9a9a"
          />
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>E-post</Text>

        <TextInput
          value={formEmail}
          onChangeText={setFormEmail}
          style={styles.input}
          placeholderTextColor="#9a9a9a"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {mode !== "edit" && (
        <View style={styles.field}>
          <Text style={styles.label}>
            Lösenord
          </Text>

          <View
            style={[
              styles.passwordContainer,
              isSmallScreen &&
                styles.passwordContainerSmall,
            ]}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              placeholderTextColor="#9a9a9a"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() =>
                setShowPassword(
                  previous => !previous,
                )
              }
              style={styles.eyeButton}
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color="#54615e"
              />
            </Pressable>
          </View>
        </View>
      )}

      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        style={styles.submitPressable}
      >
        <LinearGradient
          colors={["#2d696f", "#3c7f86"]}
          style={[
            styles.submitButton,
            isSmallScreen &&
              styles.submitButtonSmall,
          ]}
        >
          <Text style={styles.submitText}>
            {loading
              ? "Vänta..."
              : mode === "register"
                ? "Registrera"
                : mode === "login"
                  ? "Logga in"
                  : "Spara"}
          </Text>

          {mode !== "edit" && (
            <Feather
              name="arrow-right"
              size={16}
              color="#ffffff"
              style={styles.submitIcon}
            />
          )}
        </LinearGradient>
      </Pressable>

      {message ? (
        <Text style={styles.message}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    gap: 14,
  },

  heading: {
    color: "#2d696f",
    marginTop: 0,
    marginBottom: 16,
    textAlign: "center",

    // Samma fontfamilj som gamla CSS när fonten är laddad.
    fontFamily: "CormorantGaramond",
    fontSize: 28,
    fontWeight: "600",
  },

  field: {
    width: "100%",
    gap: 6,
  },

  label: {
    color: "#2d696f",
    fontFamily: "Quicksand",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    minHeight: 48,
    borderRadius: 999,

    backgroundColor: "#fefdf8",
    borderWidth: 1,
    borderColor: "#e9e5de",

    color: "#2d696f",

    paddingVertical: 12.8,
    paddingHorizontal: 16,

    fontFamily: "Quicksand",
  },

  passwordContainer: {
    width: "100%",
    minHeight: 48,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 999,
    backgroundColor: "#fefdf8",

    borderWidth: 1,
    borderColor: "#e9e5de",
  },

  passwordInput: {
    flex: 1,
    minHeight: 48,

    color: "#2d696f",

    paddingVertical: 12.8,
    paddingLeft: 16,
    paddingRight: 44,

    fontFamily: "Quicksand",
  },

  eyeButton: {
    position: "absolute",
    right: 14,
    height: 48,

    alignItems: "center",
    justifyContent: "center",
  },

  submitPressable: {
    width: "100%",
    marginTop: 11,
    borderRadius: 999,

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,

    elevation: 5,
  },

  submitButton: {
    width: "100%",
    minHeight: 52,

    borderRadius: 999,

    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  submitText: {
    color: "#ffffff",

    fontFamily: "CormorantGaramond",
    fontSize: 21.6,
    fontWeight: "600",
  },

  submitIcon: {
    position: "absolute",
    right: 16,
  },

  message: {
    color: "#2d696f",
    textAlign: "center",
    fontFamily: "Quicksand",
    fontWeight: "600",
  },
  formSmall: {
    gap: 7,
  },

  headingSmall: {
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 4,
  },

  inputSmall: {
    minHeight: 40,
    paddingVertical: 7,
  },

  passwordContainerSmall: {
    minHeight: 40,
  },

  submitButtonSmall: {
    minHeight: 42,
  },
});
