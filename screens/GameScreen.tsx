import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

function generateRandomBetween(
	min: number,
	max: number,
	exclude?: number
): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNum = Math.floor(Math.random() * (max - min)) + min;
	if (randomNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNum;
	}
}

interface Props {
	userChoice: number;
}

export default function GameScreen({ userChoice }: Props) {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, userChoice)
	);

	function lowerGuessHandler() {
		setCurrentGuess(generateRandomBetween(1, currentGuess));
	}

	function higherGuessHandler() {
		setCurrentGuess(generateRandomBetween(currentGuess, 100));
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess:</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<ButtonComponent title='LOWER' onPress={lowerGuessHandler} />
				<ButtonComponent title='HIGHER' onPress={higherGuessHandler} />
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	},
});
