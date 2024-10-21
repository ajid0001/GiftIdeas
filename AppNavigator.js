import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="People"
          component={PeopleScreen}
          options={({ navigation }) => ({
            title: "People List",
            headerStyle: {
              backgroundColor: "#ccc",
            },
            // headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <Button
                title="Add Person"
                onPress={() => navigation.navigate("AddPerson")}
              />
            ),
            headerRightContainerStyle: {
              paddingRight: 10,
            },
          })}
        />
        <Stack.Screen
          name="AddPerson"
          component={AddPersonScreen}
          options={{
            title: "Add People",
            headerStyle: {
              backgroundColor: "dodgerblue",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="IdeaScreen"
          component={IdeaScreen}
          options={{
            title: "Idea List",
            headerStyle: {
              backgroundColor: "dodgerblue",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddIdea"
          component={AddIdeaScreen}
          options={{
            title: "Add Idea",
            headerStyle: {
              backgroundColor: "dodgerblue",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
