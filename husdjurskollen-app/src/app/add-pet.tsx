import PetForm from "@/components/pets/PetForm";
import { View } from "react-native";

export default function addPet() {
  return (
    <View style={{ flex: 1 }}>
      <PetForm />
    </View>
  );
}
