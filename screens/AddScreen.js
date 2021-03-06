import { useState } from "react";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

let today = new Date()
  .toISOString()
  .replace(/T.*/, "")
  .split("-")
  .reverse()
  .join("-");

export default function AddScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccccff",
      }}
    >
      <Text>{today}</Text>
      <Text style={styles.label}>Add your Notes</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(newText) => setText(newText)}
      ></TextInput>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notes", { text })}
          style={[styles.button, styles.submitButton]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 40, color: "grey" }}>
        This is what you typed:
      </Text>
      <Text style={{ color: "#737373", marginTop: 10, width: "80%" }}>
        {text}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 24,
    justifyContent: "center",
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#d9d9d9",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  submitButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
});
