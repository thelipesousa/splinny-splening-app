// src/controllers/imageController.ts

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const selectImageFromGallery = async (): Promise<string | null> => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert("Permissão Necessária", "É necessário permissão para acessar a galeria!");
    return null;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  if (!pickerResult.canceled) {
    return pickerResult.assets[0].uri;
  }

  return null;
};

export const takePhotoWithCamera = async (): Promise<string | null> => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert("Permissão Necessária", "É necessário permissão para acessar a câmera!");
    return null;
  }

  let pickerResult = await ImagePicker.launchCameraAsync();
  if (!pickerResult.canceled) {
    return pickerResult.assets[0].uri;
  }

  return null;
};
