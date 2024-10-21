import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const [mode, setMode] = useState("date");
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowPicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const savePerson = () => {
    if (name && dob) {
      const dobFormatted = format(dob, "yyyy-MM-dd");
      addPerson(name, dobFormatted);
      navigation.goBack();
    } else {
      Alert.alert("Name and DOB are required.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add a Person</Text>

        <Text>Person Name</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </KeyboardAvoidingView>

        <Text>Date of Birth</Text>
        <KeyboardAvoidingView behavior="padding">
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <TextInput
              placeholder="2003-01-03"
              value={format(dob, "yyyy-MM-dd")}
              onPress={() => showMode("date")}
              style={styles.input}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {showPicker && (
          <DateTimePicker
            testId="dateTimePicker"
            value={dob}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={savePerson}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: "dodgerblue",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 5,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
