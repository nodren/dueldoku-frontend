import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const setDarkMode = createAction<boolean>('setDarkMode')
export const setUuid = createAction<string>('setUuid')
export const setShowSettings = createAction<boolean>('setShowSettings')
export const setValidateAnswers = createAction<boolean>('setValidateAnswers')
export const setHighlightRows = createAction<boolean>('setHighlightRows')
export const setHighlightNumbers = createAction<boolean>('setHighlightNumbers')

export const fetchUuid = createAsyncThunk<string>('fetchUuid', async () => {
	const res = await axios.get<{ id: string }>(`${process.env.API_SERVER}/board/uuid`)
	return res.data.id
})
