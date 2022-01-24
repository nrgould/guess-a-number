import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Keyboard,
	Alert,
} from 'react-native';
import BodyText from '../components/BodyText';
import ButtonComponent from '../components/ButtonComponent';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

interface Props {
	onStartGame: (selectedNumber: number) => void;
}

export default function StartGameScreen({ onStartGame }: Props) {
	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState<boolean>(false);
	const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

	function numberInputHandler(inputText: any) {
		setEnteredValue(inputText.replace(/D/g, ''));
	}

	function resetInputHandler() {
		setEnteredValue('');
		setConfirmed(false);
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert('Invalid Number', 'Needs to be between 1 and 99', [
				{
					text: 'Okay',
					style: 'destructive',
					onPress: resetInputHandler,
				},
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();
	}

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You Selected:</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton
					onPress={() => onStartGame(selectedNumber as number)}>
					START GAME
				</MainButton>
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a New Game!</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText>Enter a Number</BodyText>
					<Input
						blurOnSubmit
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='number-pad'
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
						style={styles.input}
					/>
					<View style={styles.buttonContainer}>
						<ButtonComponent
							color={colors.accent}
							title='Reset'
							onPress={resetInputHandler}
						/>
						<ButtonComponent
							color={colors.primary}
							title='Confirm'
							onPress={confirmInputHandler}
						/>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	input: {
		width: 50,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	summaryContainer: {
		margin: 20,
		alignItems: 'center',
	},
	text: {
		fontFamily: 'open-sans',
	},
});
