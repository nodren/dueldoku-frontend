import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const checkDarkMode = createAction('checkDarkMode')
export const setDarkMode = createAction<boolean>('setDarkMode')
export const setUuid = createAction<string>('setUuid')
export const setShowSettings = createAction<boolean>('setShowSettings')

export const fetchUuid = createAsyncThunk<string>('fetchUuid', async () => {
	const res = await axios.get<{ id: string }>(`${process.env.API_SERVER}/board/uuid`)
	return res.data.id
})
