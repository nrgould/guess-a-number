import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';

interface Props {
	title: string;
}

export default function Header({ title }: Props) {
	return (
		<View
			style={{
				...styles.headerBase,
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid,
				}),
			}}>
			<Text style={styles.headerTitle}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	headerBase: {
		width: '100%',
		height: 90,
		paddingTop: 36,

		alignItems: 'center',
		justifyContent: 'center',
	},
	headerIOS: {
		backgroundColor: '#fff',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	headerAndroid: {
		backgroundColor: colors.primary,
	},
	headerTitle: {
		color: Platform.OS === 'ios' ? colors.primary : '#fff',
		fontSize: Platform.OS === 'ios' ? 24 : 18,
		fontFamily: 'open-sans-bold',
	},
});
