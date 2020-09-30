import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const getScores = createSelector(
	(state: RootState) => state.multiplayer.scores,
	(res) => res,
)
