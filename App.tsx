import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
	const [userNumber, setUserNumber] = useState<number | null>(null);

	function startGameHandler(selectedNumber: number) {
		setUserNumber(selectedNumber);
	}

	let content = <StartGameScreen startGameHandler={startGameHandler} />;

	if (userNumber) {
		content = <GameScreen userChoice={userNumber} />;
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
