import {
  Camera,
  CameraType,
  onCameraReady,
  CameraPictureOptions,
} from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as RootNavigation from "./RootNavigation";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function CameraComponent() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePhoto() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        onPictureSaved: (photoData) => sendToConfirmationScreen(photoData),
      };
      const photoData = await camera.takePictureAsync(options);
    }
  }

  function sendToConfirmationScreen(photoData) {
    RootNavigation.navigate("ConfirmPhotoScreen", { photoData });

    //let id = 10;
    //let token = "token here";

    // let res = await fetch(photoData.uri);
    //let blob = await res.blob();

    //network request here
  }

  if (!permission || !permission.granted) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.containerCamera}>
        <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCamera: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    padding: 5,
    margin: 5,
    backgroundColor: "steelblue",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ddd",
  },
});
