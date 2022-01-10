import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
	children: React.ReactNode;
	style?: object;
}

export default function TitleText({ children, style }: Props) {
	return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
	body: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
});
