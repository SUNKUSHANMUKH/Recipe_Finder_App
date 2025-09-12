import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
} from "react-native";



type Task = {
  id: string;
  text: string;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (text.trim()) {
      // Alternate way with concat
      setTasks(tasks.concat({ id: Date.now().toString(), text }));
      setText("");
    }
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };


  return (
    <View style={styles.container}>
      {/* Input + Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter the task"
          value={text}
          onChangeText={setText}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Button title="Delete" color="#ff1313fd" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // should be 1, not 2
    padding: 20,
    marginTop: 50,
    backgroundColor: "#6bdc6bff"

  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color: "#000"
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,

  },
  taskText: {
    fontSize: 16,
    justifyContent:"center",
    alignItems:"center"
  },
});
