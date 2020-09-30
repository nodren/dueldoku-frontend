import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const getUuid = createSelector(
	(state: RootState) => state.setttings?.uuid,
	(res) => res,
)
