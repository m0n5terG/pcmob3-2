import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default function NotesScreen({ navigation }) {
    const [notes, setNotes] = useState([
      { title: "Walk the dog", done: false, id: "0" },
      { title: "Feed the cat", done: false, id: "1" },
      { title: "Bath the tiger", done: false, id: "2" },
    ]);
   
    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={addNote}>
            <Entypo
              name="new-message"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      });
    });
   
    function addNote() {
      navigation.navigate("Add Note");
    }
   
    function renderItem({ item }) {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
        </View>
      );
    }
   
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          data={notes}
          renderItem={renderItem}
        />
      </View>
    );
   }

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e6ebff",
      alignItems: "center",
      justifyContent: "center",
    },
   });