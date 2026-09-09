import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
export default function AppHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/account-header-wave.png")}
        style={styles.wave}
        resizeMode="stretch"
      />

      <Pressable style={styles.menuButton}>
        <Ionicons
          name="menu"
          size={28}
          color="#2d696f"
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#fef9f3",
  },

  wave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 70,
  },

  menuButton: {
    position: "absolute",
    top: 18,
    right: 20,
    zIndex: 2,
  },
});
