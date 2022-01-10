import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
	const [userNumber, setUserNumber] = useState<number | null>(null);
	const [guessRounds, setGuessRounds] = useState<number>(0);

	function gameOverHandler(numOfRounds: number) {
		setGuessRounds(numOfRounds);
	}

	function startGameHandler(selectedNumber: number | null) {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	}

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNumber) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = <GameOverScreen guessRounds={guessRounds} />;
	}

	return (
		<View style={styles.screen}>
			<Header title='Header' />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
