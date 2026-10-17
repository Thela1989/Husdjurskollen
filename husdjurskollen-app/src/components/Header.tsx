import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Svg, {
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

export default function Header() {
  const handleMenuPress = () => {
    console.log("Menu button pressed");
  };
  return (
    <View style={styles.header}>
      <Svg
        style={styles.wave}
        viewBox="0 0 390 140"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient
            id="headerGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <Stop
              offset="0%"
              stopColor="#cddecb"
            />
            <Stop
              offset="100%"
              stopColor="#e0e9dd"
            />
          </LinearGradient>
        </Defs>

        <Path
          d="
            M0 0
            H390
            V65
            C335 105 285 55 220 60
            C160 65 125 95 70 82
            C35 74 18 58 0 54
            Z
          "
          fill="url(#headerGradient)"
        />
      </Svg>

      <View style={styles.icons}>
        <Pressable
          style={styles.iconButton}
          accessibilityLabel="Öppna meny"
          onPress={handleMenuPress}
        >
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2d696f"
            strokeWidth={2.2}
          >
            <Line x1="3" y1="6" x2="21" y2="6" />
            <Line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
            />
            <Line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
            />
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    width: "100%",
    height: 55,
    zIndex: 10,
  },

  wave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 90,
  },

  icons: {
    position: "absolute",
    top: 4,
    left: 18,
    right: 8,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
  },
});
