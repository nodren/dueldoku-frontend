import constate from 'constate'
import { useState } from 'react'

function useThemeContext() {
	const [dark, setDark] = useState(false)

	return {
		dark,
		setDarkMode(mode: boolean) {
			setDark(mode)
			localStorage.setItem('dark', `${mode}`)
		},
		checkDarkMode() {
			setDark(localStorage.getItem('dark') === 'true')
		},
	}
}

export const [ThemeProvider, useTheme] = constate(useThemeContext)
