import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { addDeck } from "../utils/api";

export default function AddDeck({ navigation }) {
	const [addDeckName, setAddDeckName] = useState("");

	addNewDeck = () => {
		addDeck(addDeckName)
			.then(() => {
				setAddDeckName("");
				navigation.navigate("DeckList", { title: addDeckName });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<View style={styles.container}>
			<Text style={[styles.deckTitle, { margin: 20 }]}>Create new deck</Text>
			<TextInput
				style={styles.input}
				placeholder="deck name"
				onChangeText={(text) => setAddDeckName(text)}
				defaultValue={addDeckName}
			/>

			<TouchableOpacity style={styles.button} onPress={addNewDeck} disabled={addDeckName ? false : true}>
				<Text>Create Deck</Text>
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
