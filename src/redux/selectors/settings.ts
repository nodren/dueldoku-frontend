import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const getDarkMode = createSelector(
	(state: RootState) => state.settings.darkMode,
	(res) => res,
)

export const getHighlightRows = createSelector(
	(state: RootState) => state.settings.hilightRows,
	(res) => res,
)

export const getHighlightNumbers = createSelector(
	(state: RootState) => state.settings.hilightNumbers,
	(res) => res,
)

export const getUuid = createSelector(
	(state: RootState) => state.settings.uuid,
	(res) => res,
)

export const getShowSettings = createSelector(
	(state: RootState) => state.settings.showSettings,
	(res) => res,
)

export const getValidateAnswers = createSelector(
	(state: RootState) => state.settings.validateAnswers,
	(res) => res,
)
