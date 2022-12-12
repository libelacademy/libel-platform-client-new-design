/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Urbanist', 'sans-serif'],
		},
		extend: {
			colors: {
				white: '#ffffff',
				black: '#000000',
				'white-2': '#8A8AA0',
				primary: '#5142FC',
				done: '#47A432',
				warning: '#FFBD0C',
				critical: '#DF4949',
				light: {
					onSurface: '#1F1F2C',
					secondary: '#7A798A',
					background: {
						primary: '#FFFFFF',
						secondary: '#F8F8F8',
						footer: '#FFFFFF',
					},
				},
				dark: {
					onSurface: '#FFFFFF',
					secondary: '#EBEBEB',
					background: {
						primary: '#14141F',
						secondary: '#343444',
						footer: '#0D0D11',
					},
				},
			},
			dropShadow: {
				sidebar: '0px 0px 21px 0px  rgba(89, 102, 122, 0.2)',
				item: '0px 3px 16px rgba(47, 83, 109, 0.12)',
				'item-hover': '0px 30px 16px rgba(47, 83, 109, 0.12)',
				button: '0px 2px 6px rgba(47, 83, 109, 0.1)',
				'button-hover': '0px 20px 6px rgba(47, 83, 109, 0.1)',
				dark: [
					'9px 9px 16px rgba(95, 110, 115, 0.4)',
					'-9px -9px 16px rgba(83, 97, 100, 0.4)',
				],
				'dark-1': '11.811px 11.811px 59.0551px rgba(0, 0, 0, 0.5)',
				'dark-2':
					'-23.609px 48.8461px 73.2692px rgba(23, 18, 43, 0.55)',
				filter: '0px 4px 4px rgba(28, 24, 24, 0.25)',
			},
			boxShadow: {
				sidebar: '0px 0px 21px 0px rgba(89, 102, 122, 0.5)',
				topbar: '0px 0px 21px rgba(89, 102, 122, 0.2)',
				item: '0px 3px 16px rgba(47, 83, 109, 0.12)',
				'item-hover': '0px 30px 16px rgba(47, 83, 109, 0.12)',
				button: '0px 2px 6px rgba(47, 83, 109, 0.1)',
				'button-hover': '0px 20px 6px rgba(47, 83, 109, 0.1)',
				dark: [
					'9px 9px 16px rgba(95, 110, 115, 0.4)',
					'-9px -9px 16px rgba(83, 97, 100, 0.4)',
				],
				filter: '0px 4px 4px rgba(28, 24, 24, 0.25)',
			},
			animation: {
				line: 'line 3s linear alternate-reverse infinite',
			},
			keyframes: {
				line: {
					'0%': { left: '0' },
					'100%': { left: '90%' },
				},
			},
		},
	},
	plugins: [],
};
