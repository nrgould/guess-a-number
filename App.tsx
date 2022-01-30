import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState<number | null>(null);
	const [guessRounds, setGuessRounds] = useState<number>(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(error: any) => console.log(error)}
			/>
		);
	}

	function gameOverHandler(numOfRounds: number) {
		setGuessRounds(numOfRounds);
	}

	function startGameHandler(selectedNumber: number) {
		setUserNumber(selectedNumber);
	}

	function newGameHandler() {
		setGuessRounds(0);
		setUserNumber(null);
	}

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				onRestart={newGameHandler}
				userChoice={userNumber}
				guessRounds={guessRounds}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header title='Guess A Number' />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
