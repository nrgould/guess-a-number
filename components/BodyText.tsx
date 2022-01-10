import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
	children: React.ReactNode;
}

export default function BodyText({ children }: Props) {
	return <Text style={styles.body}>{children}</Text>;
}

const styles = StyleSheet.create({
	body: {
		fontFamily: 'open-sans',
	},
});
