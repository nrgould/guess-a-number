import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	guessRounds: number;
}

export default function GameOverScreen({ guessRounds }: Props) {
	return (
		<View style={styles.screen}>
			<Text>Game Over!</Text>
			<Text>It took {guessRounds} of guessing</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
