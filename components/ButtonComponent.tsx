import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface Props {
	title: string;
	onPress: (arg0: any) => void;
	color?: string;
}

export default function ButtonComponent({ title, onPress, color }: Props) {
	return (
		<View style={styles.button}>
			<Button title={title} onPress={onPress} color={color} />
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 100,
	},
});
