import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

interface AvatarPickerProps {
  imageUri: string | null;
  onImageChange: (uri: string) => void;
}

export default function AvatarPicker({
  imageUri,
  onImageChange,
}: AvatarPickerProps) {
  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      style={styles.avatarWrapper}
      onPress={pickImage}
    >
      <View style={styles.avatar}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.avatarImage}
          />
        ) : (
          <Ionicons
            name="paw-outline"
            size={42}
            color="#2d696f"
          />
        )}
      </View>

      <View style={styles.cameraButton}>
        <Ionicons
          name="camera-outline"
          size={16}
          color="#ffffff"
        />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  avatarWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e6f0e4",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  cameraButton: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2d696f",
    alignItems: "center",
    justifyContent: "center",
  },
});
