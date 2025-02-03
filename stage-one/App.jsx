import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { Buffer } from "buffer";

export default function App() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [inputDecryptionKey, setInputDecryptionKey] = useState("");

  const handleEncrypt = () => {
    if (!text || !key) {
      Alert.alert("Error:", "Please enter both text and key");
      return;
    }

    try {
      let encrypted = "";
      for (let i = 0; i < text.length; i++) {
        // get the uincode value of the current text and key
        const textChar = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length); // circle back if key is shorter than text
        encrypted += String.fromCharCode(textChar + keyChar); // add codes to get an "encrypted" character
      }

      // convert encrypted string to base64 for easy manipulation
      const base64Encrypted = Buffer.from(encrypted, "utf-8").toString(
        "base64"
      );
      setEncryptedText(base64Encrypted);
      setDecryptedText("");
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  const handleDecrypt = () => {
    if (!encryptedText || !inputDecryptionKey) {
      Alert.alert("Error:", "Please enter both encrypted text and key");
      return;
    }

    try {
      // decode to the original encrypted string
      const decryptedBase64 = Buffer.from(encryptedText, "base64").toString(
        "utf-8"
      );

      let decrypted = "";
      for (let i = 0; i < decryptedBase64.length; i++) {
        const encrypted = decryptedBase64.charCodeAt(i);
        const keyChar = inputDecryptionKey.charCodeAt(
          i % inputDecryptionKey.length
        );
        // subtract the key code from the encrypted code to get the original character
        decrypted += String.fromCharCode(encrypted - keyChar);
      }

      // throw an error if the decrypted text does not match the original text
      if (decrypted !== text) {
        throw new Error("Invalid key or encrypted text");
      }

      setDecryptedText(decrypted);
    } catch (error) {
      Alert.alert("Error:", error.message);
      setDecryptedText("");
    }
  };

  const handleSetText = (value) => {
    setEncryptedText("");
    setInputDecryptionKey("");
    setDecryptedText("");
    setText(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text>Text to Encrypt:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleSetText}
          value={text}
          placeholder="Enter text"
        />
        <Text>Key:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setKey}
          value={key}
          placeholder="Enter key"
          secureTextEntry
        />
        <Button onPress={handleEncrypt} title="encrypt" />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text>Encrypted Text:</Text>
        <TextInput
          style={styles.input}
          defaultValue={encryptedText}
          placeholder="Enter encrypted text"
        />
        <Text>Decryption Key:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputDecryptionKey}
          value={inputDecryptionKey}
          placeholder="Enter key"
          secureTextEntry
        />
        <Button
          onPress={handleDecrypt}
          title="decrypt"
          disabled={!encryptedText}
        />
        <Text style={styles.result}>Decrypted Text:</Text>
        <Text>{decryptedText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  result: { fontWeight: "bold", marginVertical: 10 },
});
