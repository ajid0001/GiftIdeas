import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";

export default function AddIdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { people, setPeople } = useContext(PeopleContext);
  const personId = route.params?.personId;

  const [ideaText, setIdeaText] = useState("");
  const [ideaImage, setIdeaImage] = useState("");

  const person = people.find((p) => p.id === personId);

  const handleAddIdea = () => {
    if (!ideaText.trim()) {
      alert("Please enter an idea.");
      return;
    }

    const newIdea = {
      id: Date.now().toString(),
      text: ideaText,
      img: ideaImage || "https://via.placeholder.com/50",
    };

    const updatedPeople = people.map((p) =>
      p.id === personId ? { ...p, ideas: [...(p.ideas || []), newIdea] } : p
    );

    setPeople(updatedPeople);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add Idea for {person?.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Gift idea"
        value={ideaText}
        onChangeText={setIdeaText}
      />

      <TextInput
        style={styles.input}
        placeholder="Optional: Enter image URL"
        value={ideaImage}
        onChangeText={setIdeaImage}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleAddIdea} />
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          color="red"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
