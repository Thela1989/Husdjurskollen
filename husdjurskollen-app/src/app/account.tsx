import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "@/lib/supabase";

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
      <Text style={styles.title}>
        Hej {name || "där"}!
      </Text>

      <Text style={styles.subtitle}>
        Välkommen tillbaka till Husdjurskollen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef9f3",
    padding: 24,
  },

  title: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 32,
    textAlign: "center",
  },

  subtitle: {
    color: "#54615e",
    fontFamily: "Quicksand_400Regular",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },
});
