import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';

function generateRandomBetween(
	min: number | React.MutableRefObject<number>,
	max: number | React.MutableRefObject<number>,
	exclude?: number
): number {
	min = Math.ceil(min as number);
	max = Math.floor(max as number);
	const randomNum = Math.floor(Math.random() * (max - min)) + min;
	if (randomNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNum;
	}
}
interface Props {
	userChoice: number;
	onGameOver: (args0: number) => void;
}

export default function GameScreen(
	this: any,
	{ userChoice, onGameOver }: Props
) {
	const currentLow = useRef<number>(1);
	const currentHigh = useRef<number>(100);
	const [rounds, setRounds] = useState(0);
	const [currentGuess, setCurrentGuess] = useState<number>(
		generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			userChoice
		)
	);

	useEffect(() => {
		console.log('Current guess:', currentGuess);
		console.log('User Choice:', userChoice);
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	function nextGuessHandler(direction: string) {
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie!", 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel' },
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		setCurrentGuess(
			generateRandomBetween(
				currentLow.current,
				currentHigh.current,
				currentGuess
			)
		);
		setRounds((curRounds) => curRounds + 1);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess:</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<ButtonComponent
					title='LOWER'
					onPress={nextGuessHandler.bind(this, 'lower')}
					color={colors.accent}
				/>
				<ButtonComponent
					title='HIGHER'
					onPress={nextGuessHandler.bind(this, 'greater')}
					color={colors.primary}
				/>
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
