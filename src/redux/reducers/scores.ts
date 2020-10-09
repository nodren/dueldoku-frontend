import { createReducer } from '@reduxjs/toolkit'

import { setScores } from '../actions/scores'

export interface ScoresState {
	scores: Record<string, number>
}

const initialState: ScoresState = {
	scores: {},
}

export const scoresReducer = createReducer(initialState, (builder) => {
	builder.addCase(setScores, (state, action) => {
		state.scores = action.payload
	})
})
