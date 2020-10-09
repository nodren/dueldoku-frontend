import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { boardReducer, BoardState } from './reducers/board'
import { scoresReducer, ScoresState } from './reducers/scores'
import { settingsReducer, SettingsState } from './reducers/settings'

export interface RootState {
	board: BoardState
	scores: ScoresState
	settings: SettingsState
}

const reducer = combineReducers({
	board: boardReducer,
	scores: scoresReducer,
	settings: settingsReducer,
})

export const getStore = () => {
	return configureStore({
		reducer,
	})
}
