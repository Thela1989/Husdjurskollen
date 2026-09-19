import {
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
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

  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] =
    useState(email);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<
    "success" | "error" | null
  >(null);

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
        setMessage(
          "Registrering lyckades. Kontrollera din e-post för att bekräfta kontot.",
        );
        setMessageType("success");

        onRegisterDone?.();
      }

      if (mode === "login") {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: formEmail,
            password,
          });

        if (error) throw error;

        setMessage("Inloggning");
        setMessageType("success");
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

        setMessage("Användare uppdaterad");
        setMessageType("success");
        onEditDone?.();
      }
    } catch (error) {
      console.error(error);
      setMessage("Något gick fel");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>
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
            style={styles.input}
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

          <View style={styles.passwordContainer}>
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
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.submitButton}
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
        <View style={styles.messageBox}>
          <Ionicons
            name={
              messageType === "success"
                ? "checkmark-circle-outline"
                : "alert-circle-outline"
            }
            size={22}
            color={
              messageType === "success"
                ? "#2d696f"
                : "#b44a4a"
            }
          />

          <Text style={styles.message}>
            {message}
          </Text>
        </View>
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
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 28,
  },

  field: {
    width: "100%",
    gap: 6,
  },

  label: {
    color: "#2d696f",
    fontFamily: "Quicksand_600SemiBold",
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
    fontFamily: "Quicksand_400Regular",
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
    fontFamily: "Quicksand_400Regular",
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
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 20,
  },

  submitIcon: {
    position: "absolute",
    right: 16,
  },

  message: {
    color: "#2d696f",
    textAlign: "center",
    fontFamily: "Quicksand_600SemiBold",
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
  },
});
