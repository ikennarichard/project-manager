import React from 'react';
import { View, TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  githubUrl: string;
  resources: string[];
}

const Feature = ({ githubUrl, resources }: Props) => {
  const openLink = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => openLink(githubUrl)}
      >
        <FontAwesome name="github" size={24} color="#333" />
        <Text style={styles.buttonText}>GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => openLink(resources[0])}
      >
        <FontAwesome name="book" size={24} color="#333" />
        <Text style={styles.buttonText}>React Native</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => openLink(resources[1])}
      >
        <FontAwesome name="bell" size={24} color="#333" />
        <Text style={styles.buttonText}>Telex</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => openLink(resources[2])}
      >
        <FontAwesome name="language" size={24} color="#333" />
        <Text style={styles.buttonText}>Delve</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    marginLeft: 10,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Feature;