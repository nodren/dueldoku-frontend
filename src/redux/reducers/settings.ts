import { createReducer } from '@reduxjs/toolkit'

import {
	fetchUuid,
	setDarkMode,
	setHighlightNumbers,
	setHighlightRows,
	setShowSettings,
	setUuid,
	setValidateAnswers,
} from '../actions/settings'

export interface SettingsState {
	darkMode: boolean
	hilightRows: boolean
	hilightNumbers: boolean
	uuid?: string
	showSettings: boolean
	validateAnswers: boolean
}

const initialState: SettingsState = {
	darkMode: localStorage.getItem('dark') === 'true',
	hilightRows:
		localStorage.getItem('hilightRows') === null
			? true
			: localStorage.getItem('hilightRows') === 'true',
	hilightNumbers: localStorage.getItem('hilightNumbers') === 'true',
	showSettings: false,
	validateAnswers: localStorage.getItem('validateAnswers') === 'true',
}

export const settingsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setDarkMode, (state, action) => {
			state.darkMode = action.payload
			localStorage.setItem('dark', `${action.payload}`)
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
		.addCase(setValidateAnswers, (state, action) => {
			state.validateAnswers = action.payload
			localStorage.setItem('validateAnswers', `${action.payload}`)
		})
		.addCase(setHighlightRows, (state, action) => {
			state.hilightRows = action.payload
			localStorage.setItem('hilightRows', `${action.payload}`)
		})
		.addCase(setHighlightNumbers, (state, action) => {
			state.hilightNumbers = action.payload
			localStorage.setItem('hilightNumbers', `${action.payload}`)
		})
})
