import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  Button,
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";

export default function IdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { people, setPeople } = useContext(PeopleContext);
  const personId = route.params?.id;

  const person = people.find((p) => p.id === personId);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!person) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Person not found</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const ideas = person.ideas || [];

  const deleteIdea = (ideaId) => {
    Alert.alert("Delete Idea", "Are you sure you want to delete this idea?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          const updatedPeople = people.map((p) =>
            p.id === personId
              ? {
                  ...p,
                  ideas: p.ideas.filter((idea) => idea.id !== ideaId),
                }
              : p
          );
          setPeople(updatedPeople);
        },
      },
    ]);
  };

  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>Ideas for {person.name}</Text>

      {ideas.length === 0 ? (
        <View>
          <TextInput
            placeholder="No Ideas Added Yet"
            style={styles.input}
            editable={false}
          />
        </View>
      ) : (
        <FlatList
          data={ideas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ideaContainer}>
              <TouchableOpacity onPress={() => openModal(item.img)}>
                <Image source={{ uri: item.img }} style={styles.ideaImage} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.ideaText}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteIdea(item.id)}
                >
                  <Text style={styles.deleteText}>Delete Idea</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Button
        title="Add Idea"
        onPress={() => navigation.navigate("AddIdea", { personId })}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 20,
  },
  noIdeasText: {
    fontSize: 16,
    color: "#666",
  },
  ideaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 30,
  },
  ideaText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  ideaImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
});
