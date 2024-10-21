import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";
import { Camera, CameraView } from "expo-camera";

export default function AddIdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { people, setPeople } = useContext(PeopleContext);
  const personId = route.params?.personId;

  const [ideaText, setIdeaText] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [aspectRatio] = useState(2 / 3); // Aspect ratio state
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const person = people.find((p) => p.id === personId);

  const calculateImageDimensions = (screenWidthPercentage) => {
    const screenWidth = Dimensions.get("window").width;
    const imageWidth = screenWidth * screenWidthPercentage;
    const imageHeight = imageWidth * aspectRatio;
    return { width: imageWidth, height: imageHeight };
  };

  const handleImageDimensions = () => {
    const { width, height } = calculateImageDimensions(0.6);
    setImageDimensions({ width, height });
  };

  const handleAddIdea = () => {
    if (!ideaText.trim() || !photo) {
      alert("Please fill all details.");
      return;
    }

    const newIdea = {
      id: Date.now().toString(),
      text: ideaText,
      // img: ideaImage || "https://via.placeholder.com/50",
      img: photo,
    };

    const updatedPeople = people.map((p) =>
      p.id === personId ? { ...p, ideas: [...(p.ideas || []), newIdea] } : p
    );

    setPeople(updatedPeople);

    navigation.goBack();
  };

  console.log("image", photo);

  /* CAMERA */
  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      const availableSizes =
        await cameraRef.current.getAvailablePictureSizesAsync(
          Camera.Constants.Type.back
        );
    })();
  }, []);

  // If permission is not granted
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please allow access</Text>;
  }

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri); // Set the photo URI to display
      handleImageDimensions();
      console.log("photo2", data);
    }
  };
  console.log("cameraRef", cameraRef);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  /* CAMERA */

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.heading}>Add Idea for {person?.name}</Text>

        <TextInput
          style={styles.input}
          placeholder="Gift idea"
          value={ideaText}
          onChangeText={setIdeaText}
        />

        <View style={{ flex: 1 }}>
          {/* Camera view if no photo is taken yet */}
          {!photo ? (
            <CameraView
              style={{ flex: 1 }}
              facing={facing}
              ref={cameraRef}
              // ref={(ref) => setCameraRef(ref)}
            >
              <View style={styles.cameraContainer}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.flipText}> Flip </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={() => takePicture()}
                >
                  <Text style={styles.captureText}> Take Picture </Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            // If a photo is taken, display the preview
            <View style={styles.previewContainer}>
              <Image source={{ uri: photo }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setPhoto(null)}
              >
                <Text style={styles.captureText}> Retake </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleAddIdea} />
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            color="red"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
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
    marginTop: 15,
  },
  /* CAMERA STYLES */
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  flipText: {
    fontSize: 18,
    color: "black",
  },
  captureButton: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  retakeButton: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 15,
    borderColor: "black",
    borderWidth: 0.5,
  },
  captureText: {
    fontSize: 18,
    color: "black",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    marginTop: 25,
  },
});
