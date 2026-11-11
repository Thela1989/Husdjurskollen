import { Ionicons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import AvatarPicker from "../AvatarPicker";
export default function PetForm() {
  const [birthDate, setBirthDate] =
    useState<Date | null>(null);

  const [showDatePicker, setShowDatePicker] =
    useState(false);
  const [name, setName] = useState("");

  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [petImage, setPetImage] = useState<
    string | null
  >(null);

  const [selectedType, setSelectedType] =
    useState("");
  const [selectedSex, setSelectedSex] =
    useState("");

  const petTypes = [
    "Hund",
    "Katt",
    "Kanin",
    "Annat",
  ];
  const sexOptions = ["Hane", "Hona", "Okänt"];

  const handleSavePet = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(
        "Fel när användaren hämtades:",
        userError,
      );
      return;
    }

    if (!user) {
      console.log("Ingen inloggad användare");
      return;
    }
    const { data: newPet, error } = await supabase
      .from("pets")
      .insert({
        name: name.trim(),
        type: selectedType,
        birth_date: birthDate
          ? birthDate.toISOString().split("T")[0]
          : null,
        breed: breed.trim() || null,
        gender: selectedSex || null,
        color: color.trim() || null,
        owner_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.log(
        "Fel när husdjuret sparades:",
        error,
      );
      return;
    }

    console.log("Nytt husdjur:", newPet);

    if (petImage && newPet?.id) {
      const response = await fetch(petImage);
      const arrayBuffer =
        await response.arrayBuffer();

      const filePath = `${user.id}/${newPet.id}/avatar.jpg`;

      const { error: uploadError } =
        await supabase.storage
          .from("pet-avatars")
          .upload(filePath, arrayBuffer, {
            contentType: "image/jpeg",
            upsert: true,
          });

      if (uploadError) {
        console.log(
          "Fel när djurbilden laddades upp:",
          uploadError,
        );
      }
      const { error: updateError } =
        await supabase
          .from("pets")
          .update({
            image_path: filePath,
          })
          .eq("id", newPet.id);

      if (updateError) {
        console.log(
          "Fel när bildsökvägen sparades:",
          updateError,
        );
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Lägg till ett husdjur
      </Text>
      <Text style={styles.subtitle}>
        Fyll i ditt husdjurs uppgifter för att
        komma igång.
      </Text>

      <View style={styles.avatarSection}>
        <AvatarPicker
          imageUri={petImage}
          onImageChange={setPetImage}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons
            name="person-outline"
            size={18}
            color="#2d696f"
          />
          <Text style={styles.label}>Namn</Text>
        </View>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="T.ex. Luna"
          placeholderTextColor="#93a09d"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons
            name="paw-outline"
            size={18}
            color="#2d696f"
          />
          <Text style={styles.label}>
            Djurslag
          </Text>
        </View>

        <View style={styles.chipRow}>
          {petTypes.map(item => {
            const active = selectedType === item;

            return (
              <Pressable
                key={item}
                onPress={() =>
                  setSelectedType(item)
                }
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
              >
                {active && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#2d696f"
                    style={styles.chipIcon}
                  />
                )}
                <Text
                  style={[
                    styles.chipText,
                    active &&
                      styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons
            name="pricetag-outline"
            size={18}
            color="#2d696f"
          />
          <Text style={styles.label}>Ras</Text>
        </View>

        <View style={styles.inputWithIcon}>
          <TextInput
            value={breed}
            onChangeText={setBreed}
            style={styles.inputField}
            placeholder="T.ex. Labrador"
            placeholderTextColor="#93a09d"
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#2d696f"
          />
          <Text style={styles.label}>
            Födelsedatum
          </Text>
        </View>

        <Pressable
          style={styles.inputWithIcon}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.inputField}>
            {birthDate
              ? birthDate.toLocaleDateString(
                  "sv-SE",
                )
              : "Välj datum"}
          </Text>

          <Ionicons
            name="calendar-outline"
            size={18}
            color="#7a8a87"
          />
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate ?? new Date()}
            mode="date"
            maximumDate={new Date()}
            onValueChange={(
              event,
              selectedDate,
            ) => {
              setBirthDate(selectedDate);
              setShowDatePicker(false);
            }}
            onDismiss={() => {
              setShowDatePicker(false);
            }}
          />
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons
            name="male-female-outline"
            size={18}
            color="#2d696f"
          />
          <Text style={styles.label}>Kön</Text>
        </View>

        <View style={styles.chipRow}>
          {sexOptions.map(item => {
            const active = selectedSex === item;

            return (
              <Pressable
                key={item}
                onPress={() =>
                  setSelectedSex(item)
                }
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    active &&
                      styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons
            name="color-filter-outline"
            size={18}
            color="#2d696f"
          />
          <Text style={styles.label}>Färg</Text>
        </View>

        <View style={styles.inputWithIcon}>
          <TextInput
            value={color}
            onChangeText={setColor}
            style={styles.inputField}
            placeholder="T.ex. Brun"
            placeholderTextColor="#93a09d"
          />
        </View>
      </View>

      <Pressable
        style={styles.saveButton}
        onPress={handleSavePet}
      >
        <Ionicons
          name="paw"
          size={18}
          color="#ffffff"
        />
        <Text style={styles.saveButtonText}>
          Spara husdjur
        </Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.push("/account")}
      >
        <Text style={styles.cancelButtonText}>
          Avbryt
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef9f3",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 32,
  },

  title: {
    color: "#2d696f",
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 34,
    textAlign: "center",
    marginTop: 6,
  },

  subtitle: {
    color: "#54615e",
    fontFamily: "Rubik_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#edf6ea",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  label: {
    color: "#2d696f",
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
  },

  input: {
    minHeight: 42,
    backgroundColor: "#fffdf9",
    borderWidth: 1,
    borderColor: "#e6e1d9",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontFamily: "Rubik_400Regular",
    color: "#2d696f",
  },

  inputWithIcon: {
    minHeight: 42,
    backgroundColor: "#fffdf9",
    borderWidth: 1,
    borderColor: "#e6e1d9",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  inputField: {
    flex: 1,
    fontFamily: "Rubik_400Regular",
    color: "#2d696f",
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#fffdf9",
    borderWidth: 1,
    borderColor: "#e6e1d9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  chipActive: {
    backgroundColor: "#d9ead2",
    borderColor: "#c8ddbf",
  },

  chipIcon: {
    marginRight: 4,
  },

  chipText: {
    color: "#54615e",
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
  },

  chipTextActive: {
    color: "#2d696f",
  },

  saveButton: {
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: "#2d696f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },

  saveButtonText: {
    color: "#ffffff",
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
  },

  cancelButton: {
    minHeight: 48,
    borderRadius: 999,
    backgroundColor: "#eef6ea",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    color: "#2d696f",
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 15,
  },
});
