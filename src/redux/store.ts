import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { boardReducer, BoardState } from './reducers/board'
import { multiplayerReducer, MultiplayerState } from './reducers/multiplayer'
import { settingsReducer, SettingsState } from './reducers/settings'

export interface RootState {
	board: BoardState
	multiplayer: MultiplayerState
	setttings: SettingsState
}

const reducer = combineReducers({
	board: boardReducer,
	multiplayer: multiplayerReducer,
	settings: settingsReducer,
})

export const store = configureStore({ reducer })
