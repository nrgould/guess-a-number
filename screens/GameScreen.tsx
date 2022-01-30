import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';

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

function renderListItem(listLength: number, itemData: any) {
	return (
		<View style={styles.listItem}>
			<BodyText>#{listLength - itemData.index}</BodyText>
			<BodyText>{itemData.item}</BodyText>
		</View>
	);
}
interface Props {
	userChoice: number;
	onGameOver: (args0: number) => void;
}

export default function GameScreen(
	this: any,
	{ userChoice, onGameOver }: Props
) {
	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const currentLow = useRef<number>(1);
	const currentHigh = useRef<number>(100);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get('window').width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get('window').height
	);

	useEffect(() => {
		function updateLayout() {
			setAvailableDeviceWidth(Dimensions.get('window').width);
			setAvailableDeviceHeight(Dimensions.get('window').height);
		}
		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	useEffect(() => {
		console.log('Current guess:', currentGuess);
		console.log('User Choice:', userChoice);
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
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
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setPastGuesses((curPastGuesses) => [
			nextNumber.toString(),
			...curPastGuesses,
		]);
	}

	if (availableDeviceWidth < 200) {
		return null;
	}

	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<View style={styles.numberContainer}>
					<TitleText>Opponent's Guess:</TitleText>
					<NumberContainer>{currentGuess}</NumberContainer>
				</View>
				<View style={styles.controlsLandscape}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name='md-remove' size={24} color='white' />
					</MainButton>
					<MainButton
						onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name='md-add' size={24} color='white' />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					{/* <ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, i) =>
							renderListItem(guess, pastGuesses.length - i)
						)}
					</ScrollView> */}
					<FlatList
						contentContainerStyle={styles.list}
						keyExtractor={(item) => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(
							this,
							pastGuesses.length
						)}
					/>
				</View>
			</View>
		);
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
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, i) =>
							renderListItem(guess, pastGuesses.length - i)
						)}
					</ScrollView> */}
				<FlatList
					contentContainerStyle={styles.list}
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
				/>
			</View>
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
		marginTop: Dimensions.get('window').height > 600 ? 30 : 10,
		width: 300,
		maxWidth: '90%',
	},
	controls: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	controlsLandscape: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%',
	},
	title: {
		fontSize: 32,
		color: colors.accent,
		marginBottom: 12,
	},
	numberContainer: {
		alignItems: 'center',
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
		width: 300,
		maxWidth: '100%',
		padding: 12,
		borderColor: '#ccc',
		borderWidth: 2,
		borderRadius: 12,
	},
	listContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width > 350 ? '60%' : '80%',
		flex: 1,
		borderTopColor: '#dbdbdb',
		marginTop: 20,
		borderTopWidth: 1,
	},
	list: {
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
});
