import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({
  visible,
  onClose,
}: HamburgerMenuProps) {
  if (!visible) return null;

  return (
    <View style={styles.menu}>
      <Pressable
        style={styles.closeButton}
        onPress={onClose}
      >
        <Ionicons
          name="close"
          size={22}
          color="#2d696f"
        />
      </Pressable>

      <Pressable style={styles.menuItem}>
        <Ionicons
          name="home-outline"
          size={18}
          color="#2d696f"
        />
        <Text style={styles.menuItemText}>
          Mitt konto
        </Text>
      </Pressable>

      <Pressable style={styles.menuItem}>
        <Ionicons
          name="person-outline"
          size={18}
          color="#2d696f"
        />
        <Text style={styles.menuItemText}>
          Redigera profil
        </Text>
      </Pressable>

      <Pressable style={styles.menuItem}>
        <Ionicons
          name="settings-outline"
          size={18}
          color="#2d696f"
        />
        <Text style={styles.menuItemText}>
          Inställningar
        </Text>
      </Pressable>
      <Pressable style={styles.menuItem}>
        <Ionicons
          name="help-circle-outline"
          size={18}
          color="#2d696f"
        />
        <Text style={styles.menuItemText}>
          Hjälp
        </Text>
      </Pressable>

      <Pressable style={styles.menuItem}>
        <Ionicons
          name="log-out-outline"
          size={18}
          color="#2d696f"
        />
        <Text style={styles.menuItemText}>
          Mitt konto
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 60,
    right: 16,
    width: 190,
    backgroundColor: "#fffdf9",
    borderRadius: 18,
    padding: 12,
    zIndex: 50,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
    elevation: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  menuItemText: {
    color: "#2d696f",
    fontFamily: "Quicksand_500Medium",
    fontSize: 15,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 4,
  },
});
