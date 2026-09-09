import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "@/components/AppHeader";

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Pressable
              style={styles.editAvatarButton}
            >
              <Ionicons
                name="pencil"
                size={14}
                color="#2d696f"
              />
            </Pressable>
          </View>

          <View style={styles.profileText}>
            <Text style={styles.greeting}>
              Hej Therese!
            </Text>

            <Text style={styles.subtitle}>
              Så fint att du tar hand om dina djur
            </Text>
          </View>
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.main}>
          <View style={styles.sectionTitleRow}>
            <Ionicons
              name="paw"
              size={22}
              color="#2d696f"
            />

            <Text style={styles.sectionTitle}>
              Dina husdjur
            </Text>
          </View>

          <View style={styles.petRow}>
            <Pressable
              style={styles.addPetButton}
            >
              <View style={styles.addPetCircle}>
                <Ionicons
                  name="add"
                  size={28}
                  color="#2d696f"
                />
              </View>

              <Text style={styles.addPetText}>
                Lägg till
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fef9f3",
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#fef9f3",
  },

  menuButton: {
    position: "absolute",
    top: 18,
    right: 20,
    zIndex: 2,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: -36,
    gap: 16,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: "#ffffff",
    backgroundColor: "#eeeeee",

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 4,
  },

  editAvatarButton: {
    position: "absolute",
    right: -2,
    bottom: 4,

    width: 30,
    height: 30,
    borderRadius: 15,

    backgroundColor: "#eef6eb",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#d7e6d2",

    shadowColor: "#2d696f",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    elevation: 3,
  },

  profileText: {
    flex: 1,
  },

  greeting: {
    fontFamily: "CormorantGaramond",
    fontSize: 32,
    color: "#2d696f",
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 4,
    fontFamily: "Quicksand",
    fontSize: 14,
    lineHeight: 20,
    color: "#60706c",
    maxWidth: 240,
  },

  main: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },

  sectionTitle: {
    fontFamily: "CormorantGaramond",
    fontSize: 24,
    color: "#2d696f",
  },

  petRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  addPetButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  addPetCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,

    backgroundColor: "#dcebd8",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#cfe0cb",
  },

  addPetText: {
    marginTop: 6,
    fontFamily: "Quicksand",
    fontSize: 12,
    color: "#2d696f",
  },
});
