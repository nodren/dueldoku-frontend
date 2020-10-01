import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { Answers, Board, Notes } from '../../types'

export const fetchNewBoard = createAsyncThunk<[Board, Board], string>(
	'fetchNewBoard',
	async (mode) => {
		const res = await axios.get<{ board: Board; solution: Board }>(
			`${process.env.API_SERVER}/board/generate/${mode}`,
		)
		return [res.data.board, res.data.solution]
	},
)

export const setActiveBox = createAction<[number, number]>('setActiveBox')
export const setActiveNumber = createAction<number>('setActiveNumber')
export const setAnswers = createAction<Answers>('setAnswers')
export const setBoard = createAction<Board>('updateBoard')
export const setGameOver = createAction<boolean>('setGameOver')
export const setNotes = createAction<Notes>('updateNotes')
export const setNotesMode = createAction<boolean>('setNotesMode')
export const setSolution = createAction<Board>('setSolution')
