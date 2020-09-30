import { createReducer } from '@reduxjs/toolkit'

import { setScores } from '../actions/multiplayer'

export interface MultiplayerState {
	scores: Record<string, number>
}

const initialState: MultiplayerState = {
	scores: {},
}

export const multiplayerReducer = createReducer(initialState, (builder) => {
	builder.addCase(setScores, (state, action) => {
		state.scores = action.payload
	})
})
