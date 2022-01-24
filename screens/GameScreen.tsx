import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

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
		generateRandomBetween(1, 100, userChoice)
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
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds((curRounds) => curRounds + 1);
	}

	return (
		<View style={styles.screen}>
			<View style={styles.numberContainer}>
				<TitleText>Opponent's Guess:</TitleText>
				<NumberContainer>{currentGuess}</NumberContainer>
			</View>
			<View style={styles.controls}>
				<Card style={styles.buttonContainer}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name='md-remove' size={24} color='white' />
					</MainButton>
					<MainButton
						onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name='md-add' size={24} color='white' />
					</MainButton>
				</Card>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '90%',
	},
	controls: {
		height: '80%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 32,
		color: colors.accent,
		marginBottom: 12,
	},
	numberContainer: {
		alignItems: 'center',
	},
});
