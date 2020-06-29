import React, { useState } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { getDeck } from "../utils/api";
import { useFocusEffect } from "@react-navigation/native";


export default function DeckList({ route, navigation }) {
	const [deck, setDeck] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { title } = route.params;

	useFocusEffect(() => {
		getDeck(title)
			.then((data) => {
				setDeck(data);
			})
			.then(() => setIsLoading(false))
			.catch((err) => Alert.alert(err));
	}, [title]);

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Text style={[styles.deckTitle, { margin: 50 }]}>Number of cards: {deck.questions.length}</Text>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewQuestion", { title: deck.title })}>
				<Text>Add Card</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizView", { title: deck.title })}>
				<Text>Start a Quiz</Text>
			</TouchableOpacity>
		</View>
	);
}
