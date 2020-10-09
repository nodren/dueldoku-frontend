import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const getScores = createSelector(
	(state: RootState) => state.scores.scores,
	(res) => res,
)
