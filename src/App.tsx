import './styles/dark.css'
import 'semantic-ui-css/semantic.min.css'

import React, { FC, StrictMode } from 'react'
import { Provider } from 'react-redux'

import { Theme } from './components/Theme'
import { ThemeProvider } from './hooks/useDarkMode'
import { store } from './redux/store'

export const App: FC = () => {
	return (
		<StrictMode>
			<ThemeProvider>
				<Provider store={store}>
					<Theme>hi</Theme>
				</Provider>
			</ThemeProvider>
		</StrictMode>
	)
}
