import { Platform } from "react-native";

class Env {
  static get clientId() {
    const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
    if (!clientId) {
      throw new Error("Missing EXPO_PUBLIC_CLIENT_ID environment variable");
    }
    return clientId;
  }

  static get serverUrl() {
    if (Platform.OS === "ios") {
      const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL_IOS;
      if (!serverUrl) {
        throw new Error(
          "Missing EXPO_PUBLIC_SERVER_URL_IOS environment variable"
        );
      }
      return serverUrl;
    } else {
      const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL_ANDROID;
      if (!serverUrl) {
        throw new Error(
          "Missing EXPO_PUBLIC_SERVER_URL_ANDROID environment variable"
        );
      }
      return serverUrl;
    }
  }
}

export default Env;
