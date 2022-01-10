import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';

interface Props {
	guessRounds: number;
	userChoice: number | null;
	onRestart: () => void;
}

export default function GameOverScreen({
	guessRounds,
	userChoice,
	onRestart,
}: Props) {
	return (
		<View style={styles.screen}>
			<Card style={styles.card}>
				<Text style={styles.title}>Game Over!</Text>
				<Text style={styles.subtitle}>Your number was:</Text>
				<NumberContainer>{userChoice}</NumberContainer>
				<Text>It took {guessRounds} rounds of guessing.</Text>
			</Card>
			<ButtonComponent
				style={{ width: 300 }}
				title='Start New Game'
				onPress={onRestart}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
		color: colors.primary,
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 20,
		marginBottom: 0,
	},
	card: {
		alignItems: 'center',
	},
});
