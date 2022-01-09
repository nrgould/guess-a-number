import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

interface Props {
	children?: React.ReactNode;
}

export default function NumberContainer({ children }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: colors.accent,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	number: {
		color: colors.accent,
		fontSize: 22,
	},
});
