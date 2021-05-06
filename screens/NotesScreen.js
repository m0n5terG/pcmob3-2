import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Alert,
 Text,
 View,
 FlatList,
 TouchableOpacity,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ navigation, route }) {
 
    const [notes, setNotes] = useState([]);

    function refreshNotes() {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM notes",
            null,
            (txObj, { rows: { _array } }) => setNotes(_array),
            (txObj, error) => console.log(`Error: ${error}`)
        );
      });
    }

    useEffect(() => {
      db.transaction((tx) => {
          tx.executeSql(
              `CREATE TABLE IF NOT EXISTS notes
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 title TEXT,
                 done INT);`
          );
      },
      null,
      refreshNotes
      );
  }, []);

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

  useEffect(() => {
   if (route.params?.text) {
     db.transaction((tx) => {
       tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
         route.params.text,
       ]);
     },
     null,
     refreshNotes
     );
    }
 }, [route.params?.text]);
    
 function addNote() {
   navigation.navigate("Add Note");
 }

 function deleteNote(id) {
    console.log("Deleting " + id);
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
        Alert.alert(
          'Done!',
          'Note deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('Notes'),
            },
          ],
          { cancelable: false }
        );
      },
      null,
      refreshNotes
    );
  }

 function renderItem({ item }) {
   return (
     <View
       style={{
         flexDirection: "row",
         justifyContent: "center",
         paddingTop: 10,
         width: "auto"     
       }}>
         <TouchableOpacity style={styles.listContainer}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: 340, paddingLeft: 10 }}>
       <Text style={{ textAlign: "left", fontSize: 16, padding: 10 }}>{item.title}</Text>
       </View>
       <TouchableOpacity onPress={() => deleteNote(item.id)}>
       <MaterialIcons 
            name="delete" 
            size={24} 
            color="blue"
        />  
       </TouchableOpacity>
       </TouchableOpacity>
     </View>
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "auto"}}
       data={notes}
       renderItem={renderItem}
       keyExtractor={(item) => item.id.toString()}
     />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "lightblue",
   alignItems: "center",
   justifyContent: "center",
 },
 listContainer: {
   backgroundColor: "whitesmoke",
   height: "auto",
   borderRadius: 10,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center"
 }
});




