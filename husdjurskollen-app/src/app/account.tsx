import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { supabase } from "@/lib/supabase";

import Header from "@/components/Header";

export default function Account() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

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
      <Header />
      <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Pressable style={styles.editButton}>
              <Ionicons
                name="pencil"
                size={15}
                color="#2d696f"
              />
            </Pressable>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.title}>
              Hej {name || "där"}!
            </Text>
          </View>
        </View>

        <View style={styles.petsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons
                name="paw-outline"
                size={22}
                color="#2d696f"
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
    gap: 16,
    marginTop: 8,
    marginBottom: 26,
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
  },

  title: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 34,
    lineHeight: 38,
  },

  subtitle: {
    color: "#54615e",
    fontFamily: "Quicksand_400Regular",
    fontSize: 15,
    lineHeight: 20,
    marginTop: 4,
  },

  petsSection: {
    marginBottom: 22,
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
    fontSize: 26,
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
  },

  reminderCard: {
    backgroundColor: "#fff0e9",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  safetyCard: {
    backgroundColor: "#e4f2f1",
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
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
  },

  emptyText: {
    color: "#54615e",
    fontFamily: "Quicksand_400Regular",
    fontSize: 14,
  },

  safetyText: {
    color: "#54615e",
    fontFamily: "Quicksand_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
