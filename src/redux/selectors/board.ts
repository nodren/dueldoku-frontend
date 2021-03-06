import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

export const getActiveBox = createSelector(
	(state: RootState) => state.board.activeBox,
	(res) => res,
)

export const getActiveNumber = createSelector(
	(state: RootState) => state.board.activeNumber,
	(res) => res,
)

export const getSelectedBox = createSelector(
	(state: RootState) => state.board.selectedBox,
	(res) => res,
)

export const getAnswers = createSelector(
	(state: RootState) => state.board.answers,
	(res) => res,
)

export const getBoard = createSelector(
	(state: RootState) => state.board.board,
	(res) => res,
)

export const getDifficulty = createSelector(
	(state: RootState) => state.board.difficulty,
	(res) => res,
)

export const getGameOver = createSelector(
	(state: RootState) => state.board.gameOver,
	(res) => res,
)
export const getGameOverAnimation = createSelector(
	(state: RootState) => state.board.gameOverAnimation,
	(res) => res,
)

export const getNotes = createSelector(
	(state: RootState) => state.board.notes,
	(res) => res,
)

export const getNotesMode = createSelector(
	(state: RootState) => state.board.notesMode,
	(res) => res,
)

export const getNumLock = createSelector(
	(state: RootState) => state.board.numLock,
	(res) => res,
)

export const getSolution = createSelector(
	(state: RootState) => state.board.solution,
	(res) => res,
)
