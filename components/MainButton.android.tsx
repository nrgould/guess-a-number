import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';
import colors from '../constants/colors';

interface Props {
	children: React.ReactNode | string;
	style?: object;
	onPress: (args0: any) => void;
}

export default function MainButton({ children, style, onPress }: Props) {
	let ButtonComponent: any = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}
	return (
		<View style={styles.buttonContainer}>
			<ButtonComponent activeOpacity={0.6} onPress={onPress}>
				<View style={{ ...styles.button, ...style }}>
					<Text style={styles.buttonText}>{children}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8,
		width: '100%',
	},
	buttonContainer: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
});
