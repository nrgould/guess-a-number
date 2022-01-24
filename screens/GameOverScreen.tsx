import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
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
			<TitleText style={styles.title}>Game Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{
						uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/7625/production/_111254203_8d8f9dd1-cecb-4acd-a4d9-9455dffd652d.jpg',
					}}
					// source={require('../assets/success.png')}
					resizeMode='cover'
				/>
			</View>
			<Text style={styles.subtitle}>Your number was:</Text>
			<NumberContainer>{userChoice}</NumberContainer>
			<BodyText>
				It took <Text style={styles.highlight}>{guessRounds}</Text>{' '}
				rounds of guessing.
			</BodyText>
			<MainButton style={{ width: 300 }} onPress={onRestart}>
				Start New Game
			</MainButton>
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
		marginTop: 50,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imageContainer: {
		borderRadius: 200,
		width: 300,
		height: 300,
		borderWidth: 3,
		alignItems: 'center',
		overflow: 'hidden',
		marginVertical: 30,
	},
	highlight: {
		color: colors.primary,
		fontFamily: 'open-sans-bold',
	},
});
