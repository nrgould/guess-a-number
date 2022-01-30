import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
	children: React.ReactNode;
	style?: any;
}

export default function BodyText({ children, style }: Props) {
	return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
	body: {
		fontFamily: 'open-sans',
	},
});
