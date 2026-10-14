import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { supabase } from "@/lib/supabase";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUri, setAvatarUri] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      setEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setName(data?.name ?? "");
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (avatarUri) {
      await uploadAvatar();
    }

    if (userError || !user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        name: name.trim(),
      })
      .eq("id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    if (avatarUri) {
      await uploadAvatar();
    }

    const { error: emailError } =
      await supabase.auth.updateUser({
        email: email.trim(),
      });

    if (emailError) {
      alert(emailError);
      return;
    }
    alert("profil sparad");
  };

  const handleChangePhoto = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarUri) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return;

    const response = await fetch(avatarUri);
    const arrayBuffer =
      await response.arrayBuffer();

    const filepath = `${user.id}/avatar.jpg`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filepath, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.log("Fel vid uppladdning:", error);
      return;
    }

    console.log("Profilbild uppladdad:");
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <Text style={styles.title}>
        Redigera din profil
      </Text>
      <Pressable
        style={styles.avatarWrapper}
        onPress={handleChangePhoto}
      >
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatarImage}
            />
          ) : (
            <Ionicons
              name="person-outline"
              size={46}
              color="#2d696f"
            />
          )}
        </View>

        <View
          style={styles.editAvatarButtonContainer}
        >
          <Ionicons
            name="camera-outline"
            size={15}
            color="#ffffff"
          />
        </View>

        <Text style={styles.changePhotoText}>
          Byt profilbild
        </Text>
      </Pressable>
      <View style={styles.field}>
        <Text style={styles.label}>Namn</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputWithIcon}
          />
          <Ionicons
            name="person-outline"
            size={20}
            color="#2d696f"
          />
        </View>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>E-post</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.inputWithIcon}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Ionicons
            name="mail-outline"
            size={20}
            color="#2d696f"
          />
        </View>
      </View>
      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          Spara ändringarna
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "CormorantGaramond_600SemiBold",
    color: "#2d696f",
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: 20,
    position: "relative",

    width: 100,
    height: 100,

    alignSelf: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e6f0e4",
    borderWidth: 3,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  editAvatarButtonContainer: {
    position: "absolute",
    right: 3,
    bottom: 1,
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#2d696f",
    alignItems: "center",
    justifyContent: "center",
  },
  changePhotoText: {
    textAlign: "center",
    marginTop: 10,
    color: "#2d696f",
    fontFamily: "Quicksand_400Regular",
    fontSize: 13,
  },
  field: {
    marginTop: 20,
    width: "90%",
    maxWidth: 520,
    alignSelf: "center",
  },

  label: {
    color: "#2d696f",
    fontFamily: "Quicksand_600SemiBold",
    marginBottom: 6,
    marginLeft: 10,
  },

  inputContainer: {
    width: "100%",
    minHeight: 48,
    borderRadius: 50,
    backgroundColor: "#fefdf8",
    borderWidth: 1,
    borderColor: "#e9e5de",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },

  inputWithIcon: {
    flex: 1,
    color: "#2d696f",
    fontFamily: "Quicksand_400Regular",
  },

  input: {
    minHeight: 48,
    borderRadius: 50,
    backgroundColor: "#fefdf8",
    borderWidth: 1,
    borderColor: "#e9e5de",
    paddingHorizontal: 16,
    color: "#2d696f",
    fontFamily: "Quicksand_400Regular",
  },

  saveButton: {
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: "#2d696f",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginRight: 20,
    marginLeft: 20,
  },

  saveButtonText: {
    color: "#fff",
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
  },
});
