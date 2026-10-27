import HamburgerMenu from "@/components/HamburgerMenu";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeartIcon from "../../assets/images/heart-icon.svg";

export default function Account() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatarUri, setAvatarUri] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          setLoading(false);
          return;
        }

        const {
          data: petsData,
          error: petsError,
        } = await supabase
          .from("pets")
          .select("*")
          .eq("user_id", user.id);
        if (petsError) {
          console.log("Pets error:", petsError);
        }

        const filePath = `${user.id}/avatar.jpg`;

        const {
          data: avatarData,
          error: avatarError,
        } = await supabase.storage
          .from("avatars")
          .createSignedUrl(filePath, 60 * 60);
        if (
          !avatarError &&
          avatarData?.signedUrl
        ) {
          setAvatarUri(avatarData.signedUrl);
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setName(data?.name ?? "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#2d696f"
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header
        showMenu={true}
        onMenuPress={() => setMenuOpen(true)}
      />

      <HamburgerMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarWrapper}>
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

              <Pressable
                style={styles.editButton}
                onPress={() =>
                  router.push("/edit-profile")
                }
              >
                <Ionicons
                  name="pencil"
                  size={15}
                  color="#2d696f"
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.title}>
              Hej {name || "där"}!
            </Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>
                Så fint att du tar hand om dina
                djur
              </Text>

              <HeartIcon
                width={14}
                height={14}
              ></HeartIcon>
            </View>
          </View>
        </View>

        <View style={styles.petsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons
                name="paw"
                size={22}
                color="#2d696f"
                style={{
                  transform: [
                    { rotate: "-10deg" },
                  ],
                }}
              />
              <Text style={styles.sectionTitle}>
                Dina husdjur
              </Text>
            </View>

            <Pressable
              style={styles.showAllButton}
            >
              <Text style={styles.showAllText}>
                Visa alla
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#2d696f"
              />
            </Pressable>
          </View>
          <View style={styles.petsRow}>
            {pets.map(pet => (
              <View
                key={pet.id}
                style={styles.petItem}
              >
                <View
                  style={styles.petAvatarWrapper}
                >
                  <View style={styles.petAvatar}>
                    <Ionicons
                      name="camera-outline"
                      size={24}
                      color="#7fa3a0"
                    />
                  </View>

                  <Pressable
                    style={styles.petEditButton}
                  >
                    <Ionicons
                      name="pencil"
                      size={11}
                      color="#2d696f"
                    />
                  </Pressable>
                </View>

                <Text style={styles.petName}>
                  {pet.name}
                </Text>
              </View>
            ))}

            <Pressable style={styles.addPetItem}>
              <View style={styles.addPetCircle}>
                <Ionicons
                  name="add"
                  size={36}
                  color="#2d696f"
                />
              </View>

              <Text style={styles.addPetText}>
                Lägg till
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.todoCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#2d696f"
              />

              <Text style={styles.cardTitle}>
                Dagens att göra
              </Text>
            </View>
          </View>

          <Text style={styles.emptyText}>
            Inga uppgifter ännu.
          </Text>
        </View>

        <View style={styles.reminderCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#9b5d49"
              />

              <Text
                style={[
                  styles.cardTitle,
                  styles.reminderTitle,
                ]}
              >
                Påminnelser
              </Text>
            </View>

            <Pressable
              style={styles.showAllButton}
            >
              <Text
                style={[
                  styles.showAllText,
                  styles.reminderText,
                ]}
              >
                Visa alla
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9b5d49"
              />
            </Pressable>
          </View>

          <Text style={styles.emptyText}>
            Inga påminnelser ännu.
          </Text>
        </View>

        <View style={styles.safetyCard}>
          <View style={styles.cardTitleRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#2d696f"
            />

            <Text style={styles.cardTitle}>
              Trygghetsplan
            </Text>
          </View>

          <Text style={styles.safetyText}>
            Samla viktig information om dina djur
            ifall något oväntat händer.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef9f3",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef9f3",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginLeft: 20,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: "#ffffff",
    margin: 3,
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
  },

  editButton: {
    position: "absolute",
    right: -2,
    bottom: 2,

    width: 30,
    height: 30,
    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#e6f0e4",
    borderWidth: 2,
    borderColor: "#ffffff",
  },

  profileText: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 38,
    lineHeight: 38,
  },

  subtitle: {
    color: "#54615e",
    fontFamily: "Rubik_400Regular",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 2,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  petsSection: {
    marginBottom: 22,
    marginLeft: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sectionTitle: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 34,
  },

  showAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  showAllText: {
    color: "#2d696f",
    fontFamily: "Quicksand_500Medium",
    fontSize: 13,
  },

  petsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  petItem: {
    alignItems: "center",
  },

  petAvatarWrapper: {
    position: "relative",
  },

  petEditButton: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6f0e4",
    borderWidth: 2,
    borderColor: "#ffffff",
  },

  petAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#e6f0e4",
    alignItems: "center",
    justifyContent: "center",
  },

  petName: {
    marginTop: 6,
    color: "#2d696f",
    fontFamily: "Quicksand_500Medium",
    fontSize: 13,
  },

  addPetItem: {
    alignItems: "center",
  },

  addPetCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#dcebd9",

    alignItems: "center",
    justifyContent: "center",
  },

  addPetText: {
    marginTop: 6,
    color: "#2d696f",
    fontFamily: "Quicksand_500Medium",
    fontSize: 13,
  },

  todoCard: {
    backgroundColor: "#e7f1e5",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
  },

  reminderCard: {
    backgroundColor: "#fff0e9",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
  },

  safetyCard: {
    backgroundColor: "#e4f2f1",
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardTitle: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 23,
  },

  reminderTitle: {
    color: "#9b5d49",
  },

  reminderText: {
    color: "#9b5d49",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 15,
  },

  emptyText: {
    color: "#54615e",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 15,
  },

  safetyText: {
    color: "#54615e",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 15,
    lineHeight: 20,
    marginTop: 10,
  },
});
