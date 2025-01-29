import { StatusBar } from "expo-status-bar";
import Feature from "./Feature";
import { SafeAreaView, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Feature
        githubUrl="https://github.com/ikennarichard/project-manager/stage-zero"
        resources={[
          "https://hng.tech/hire/react-native-developers",
          "https://telex.im",
        ]}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
