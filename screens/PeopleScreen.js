import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
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
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, deletePerson } = useContext(PeopleContext);

  const confirmDelete = (id) => {
    {
      Alert.alert(
        "Delete Person",
        "Are you sure you want to delete this person?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => deletePerson(id),
          },
        ],
      );
    }
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => confirmDelete(id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>People List</Text>
        {/* <Text style={styles.heading2}>No People Saved Yet</Text> */}
        
        <FlatList
          // onPress={() => navigation.navigate("Idea")}
          data={people}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <TouchableOpacity
                  style={styles.personContainer}
                  onPress={() =>
                    navigation.navigate("IdeaScreen", { id: item.id })
                  }
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.dob}>{item.dob}</Text>
                  </View>
                  <Image
                    source={require("../assets/bulb.png")}
                    style={styles.itemImage}
                  />
                </TouchableOpacity>
              </Swipeable>
            </View>
          )}
        />
        <Button
          title="Add Person"
          onPress={() => navigation.navigate("AddPerson")}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 15,
    marginBottom: 20,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dob: {
    fontSize: 14,
    color: "#666",
  },
  personContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  personGrid: {
    flex: 1,
    backgroundColor: "blue",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 8,
    marginRight: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
