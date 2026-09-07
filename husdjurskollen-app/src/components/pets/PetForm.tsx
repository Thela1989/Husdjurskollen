import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "@/lib/supabase";

interface Pet {
  id: number;
  name: string;
  type: string | null;
  birth_date: string | null;
  gender: string | null;
  color: string | null;
  breed: string | null;

  owner_id: string;
}
interface Props {
  onPetCreated?: (newPet: Pet) => void;
}
export default function PetForm({
  onPetCreated,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate form fields
  };
  return (
    <View style={styles.form}>
      <Text style={styles.heading}>
        Lägg till husdjur
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Namn</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Djurets namn"
          placeholderTextColor="#9a9a9a"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>
          Typ av djur
        </Text>

        <TextInput
          value={type}
          onChangeText={setType}
          style={styles.input}
          placeholder="Hund, katt, kanin..."
          placeholderTextColor="#9a9a9a"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>
          Födelsedatum
        </Text>

        <TextInput
          value={birthDate}
          onChangeText={setBirthDate}
          style={styles.input}
          placeholder="ÅÅÅÅ-MM-DD"
          placeholderTextColor="#9a9a9a"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Ras</Text>

        <TextInput
          value={breed}
          onChangeText={setBreed}
          style={styles.input}
          placeholder="Till exempel labrador"
          placeholderTextColor="#9a9a9a"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Kön</Text>

        <TextInput
          value={gender}
          onChangeText={setGender}
          style={styles.input}
          placeholder="Hona, hane eller okänt"
          placeholderTextColor="#9a9a9a"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Färg</Text>

        <TextInput
          value={color}
          onChangeText={setColor}
          style={styles.input}
          placeholder="Till exempel brun"
          placeholderTextColor="#9a9a9a"
        />
      </View>
      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Sparar..."
            : "Lägg till husdjur"}
        </Text>
      </Pressable>
      {message ? (
        <Text style={styles.message}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    gap: 12,
  },

  heading: {
    fontSize: 24,
    fontFamily: "CormorantGaramond",
    color: "#2d696f",
    textAlign: "center",
  },

  field: {
    gap: 6,
  },

  label: {
    fontFamily: "Quicksand",
    color: "#2d696f",
    fontWeight: "600",
  },

  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#e9e5de",
    borderRadius: 999,
    paddingHorizontal: 16,
    backgroundColor: "#fefdf8",
    color: "#2d696f",
    fontFamily: "Quicksand",
  },
  button: {
    minHeight: 48,
    borderRadius: 999,
    backgroundColor: "#2d696f",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontFamily: "Quicksand",
    fontWeight: "700",
  },

  message: {
    textAlign: "center",
    color: "#2d696f",
    fontFamily: "Quicksand",
  },
});
