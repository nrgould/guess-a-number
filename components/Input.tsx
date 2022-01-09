import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props extends React.ComponentProps<typeof TextInput> {
	style?: any;
}

export default function Input({ style, ...props }: Props) {
	return <TextInput {...props} style={{ ...styles.input, ...style }} />;
}

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		marginVertical: 10,
	},
});
