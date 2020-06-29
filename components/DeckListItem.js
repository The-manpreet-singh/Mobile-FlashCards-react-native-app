import React, { Component } from "react";
import { View, Text } from "react-native";
import { getDeck } from "../utils/api";

export default class DeckListItem extends Component {
	state = {
		data: "",
	};

	componentDidMount() {
		getDeck().then((data) => {
			this.setState({ data: data });
		});
	}

	render() {
		return (
			<View>
				<Text>Deck List item</Text>
			</View>
		);
	}
}
