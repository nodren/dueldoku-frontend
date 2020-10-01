import { createReducer } from '@reduxjs/toolkit'

import {
	checkDarkMode,
	fetchUuid,
	setDarkMode,
	setShowSettings,
	setUuid,
} from '../actions/settings'

export interface SettingsState {
	darkMode: boolean
	uuid?: string
	showSettings: boolean
}

const initialState: SettingsState = {
	darkMode: localStorage.getItem('dark') === 'true',
	showSettings: false,
}

export const settingsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(checkDarkMode, (state) => {
			state.darkMode = localStorage.getItem('dark') === 'true'
		})
		.addCase(setDarkMode, (state, action) => {
			state.darkMode = action.payload
		})
		.addCase(setUuid, (state, action) => {
			state.uuid = action.payload
		})
		.addCase(fetchUuid.fulfilled, (state, action) => {
			state.uuid = action.payload
		})
		.addCase(setShowSettings, (state, action) => {
			state.showSettings = action.payload
		})
})
