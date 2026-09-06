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
          accessibilityLabel="Notifieringar"
        >
          <Svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2d696f"
            strokeWidth={2.2}
          >
            <Path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
            <Path d="M10 18a2 2 0 0 0 4 0" />
          </Svg>
        </Pressable>

        <Pressable
          style={styles.iconButton}
          accessibilityLabel="Öppna meny"
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
    top: 14,
    left: 28,
    right: 28,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
