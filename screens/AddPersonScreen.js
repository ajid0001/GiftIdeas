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
  // const [text, setText] = useState("Show Date Picker");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowPicker(Platform.OS === "ios");
    setDob(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    // setText(fDate);
    console.log(fDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  // const handleDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || dob;
  //   setShowPicker(false);
  //   setDob(currentDate);
  // };

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
    <View style={styles.container}>
      <Text style={styles.heading}>Add a Person</Text>

      <Text>Person Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          placeholder="2003-01-03"
          value={format(dob, "yyyy-MM-dd")}
          onPress={() => showMode("date")}
          // onChangeText={setDob}
          style={styles.input}
        />
      </TouchableOpacity>

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

      <Button title="Save" onPress={savePerson} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
