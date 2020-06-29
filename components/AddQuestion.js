import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { addCardToDeck } from "../utils/api";
import { Platform, StyleSheet } from "react-native";
import { white, purple, gray } from "./utils/colors";


const AddQuestion=({ route, navigation }) => {
  const [addQuestion, setAddQuestion] = useState(null);
	const [addAnswer, setAddAnswer] = useState(null);
	const { title } = route.params;

   addCard= ()=> {
    const card = {
      addQuestion: addQuestion,
      addAnswer: addAnswer,
    };
    addCardToDeck(title, card)
      .then(() => {
        setAddAnswer("");
        setAddQuestion("");
      })
      .then(() => navigation.navigate("DeckList", { title }));
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.deckTitle, {marginTop: 50}]}>Add New Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Add question..."
        onChangeText={(text) => setAddQuestion(text)}
        defaultValue={addQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="add answer..."
        onChangeText={(text) => setAddAnswer(text)}
        defaultValue={addAnswer}
      />

      <TouchableOpacity style={styles.button} onPress={addCard}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	input: {
		height: 40,
		borderColor: gray,
		borderWidth: 1,
		marginBottom: 20,
		paddingLeft: 3,
		width: 300,
		marginTop: 50,
	},
	deck: {
		width: 250,
		justifyContent: "space-around",
		alignContent: "center",
		backgroundColor: white,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 5,
		padding: 15,
		paddingLeft: 25,
		paddingRight: 25,
		marginBottom: 20,
		marginTop: 20,
	},
	deckTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	deckSubTitle: {
		fontSize: 13,
		fontWeight: "bold",
		paddingTop: 5,
	},

	button: {
		width: 250,
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "center",
		backgroundColor: white,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		paddingLeft: 25,
		paddingRight: 25,
		marginBottom: 25,
	},
});

export default AddQuestion;