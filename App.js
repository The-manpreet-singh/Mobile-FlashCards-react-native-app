import React from "react";
import { View } from "react-native";
import DeckList from "./components/DeckList";
import DeckListItem from "./components/DeckListItem";

export default function App() {
	return (
		<View>
			<DeckList />
			<DeckListItem />
		</View>
	);
}
