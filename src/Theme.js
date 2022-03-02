import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { grey, purple, teal } from '@mui/material/colors';

import Navigation from './Navigation';

import './App.css';

let theme = createTheme({
	palette: {
		primary: {
			main: purple[900],
		},
		secondary: {
			main: teal[400],
		},
		disabled: {
			main: grey[100],
		},
		white: {
			main: 'white',
		},
	},
	typography: {
		overline: {
			fontSize: '0.625rem',
			fontWeight: 500,
		},
	},
	shape: {
		borderRadius: 4,
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: 'white',
					borderBottom: `solid 1px ${purple[900]}`,
					color: purple[900],
				},
			},
		},
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
			styleOverrides: {
				root: {},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'white',
					'&:active, &:hover, &:focus': {
						backgroundColor: 'white',
					},
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'filled',
				size: 'small',
				color: 'secondary',
			},
		},
	},
});
theme = responsiveFontSizes(theme);

export default function Theme() {
	return (
		<ThemeProvider theme={theme}>
			<Navigation />
		</ThemeProvider>
	);
}