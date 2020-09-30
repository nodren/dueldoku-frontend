import { createReducer } from '@reduxjs/toolkit'
import { checkDarkMode, setDarkMode, setUuid, showSettings } from '../actions/settings'

export interface SettingsState {
	uuid?: string
}

const initialState: SettingsState = {}

export const settingsReducer = createReducer(initialState, (builder) => {
	builder.addCase(setUuid, (state, action) => {
		state.uuid = action.payload
	})
})
