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

import Brand from "../../assets/images/brand.svg";

interface HeaderProps {
  showMenu?: boolean;
  onMenuPress?: () => void;
}

export default function Header({
  showMenu = false,
  onMenuPress,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Svg
        style={styles.wave}
        viewBox="0 0 390 140"
        preserveAspectRatio="none"
      >
        {" "}
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
      </Svg>{" "}
      <Brand
        width={220}
        height={60}
        style={styles.brand}
      />
      <View style={styles.icons}>
        {showMenu && (
          <Pressable
            style={styles.iconButton}
            accessibilityLabel="Öppna meny"
            onPress={onMenuPress}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2d696f"
              strokeWidth={2.2}
            >
              <Line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
              />
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    width: "100%",
    height: 70,
    zIndex: 10,
  },

  wave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 110,
  },

  icons: {
    position: "absolute",
    top: 3,
    left: 20,
    right: 20,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
  },

  brand: {
    position: "absolute",
    top: -6,
    alignSelf: "center",
    zIndex: 3,
  },
});
