import { createAction } from '@reduxjs/toolkit'

export const setScores = createAction<Record<string, number>>('setScores')
