import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();
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
      <View
        style={[
          styles.headerContent,
          { paddingTop: insets.top },
        ]}
      >
        <Brand
          width={180}
          height={40}
          style={{
            transform: [{ translateY: -4 }],
          }}
        />

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
    height: 95,
    zIndex: 10,
  },

  wave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 170,
  },

  iconButton: {
    position: "absolute",
    right: 0,
    bottom: 8,
    padding: 8,
  },
  headerContent: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: 75,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    zIndex: 3,
  },
});
