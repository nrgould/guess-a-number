import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
	children?: React.ReactNode;
	style?: any;
}

export default function Card({ children, style }: Props) {
	return <View style={{ ...styles.card, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 20,
		elevation: 5,
	},
});
