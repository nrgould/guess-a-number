import React from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';

interface Props {
	title: string;
	onPress: (arg0: any) => void;
	color?: string;
	style?: any;
}

export default function ButtonComponent({
	title,
	onPress,
	color,
	style,
}: Props) {
	return (
		<View style={{ ...styles.button, ...style }}>
			<Button title={title} onPress={onPress} color={color} />
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		width: Dimensions.get('window').width / 4,
	},
});
