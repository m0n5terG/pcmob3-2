import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Alert,
 Text,
 CheckBox,
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

 /*function done(id) {
   db.transaction((tx) => {
     tx.executeSql(
       `SELECT * FROM notes WHERE done = ?;`, [
         done ? 1 : 0],
         (txObj, { rows: { _array } }) => setNotes(_array)
         );
   });
 };*/

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
//const [isSelected, setSelection] = useState(false);
 function renderItem({ item }) {
   return (
     <View
       style={{
         padding: 10,
         paddingRight: 30,
         paddingTop: 20,
         paddingBottom: 20,
         borderBottomColor: "#ccc",
         borderBottomWidth: 1,
         flexDirection: "row",
         justifyContent: "space-between",
       }}
     >
      
       <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
       <TouchableOpacity onPress={() => deleteNote(item.id)}>
       <MaterialIcons 
            name="delete" 
            size={24} 
            color="darkgray"
            flexDirection="row"
        />  
       </TouchableOpacity>
     </View>
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
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
   backgroundColor: "#e6ebff",
   alignItems: "center",
   justifyContent: "center",
 },
 /*checkbox: {
   alignSelf: "center"
 },*/
});





