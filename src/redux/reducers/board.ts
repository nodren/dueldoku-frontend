import { createReducer } from '@reduxjs/toolkit'

import { Answers, Board, Notes } from '../../types'
import {
	setBoard,
	setSolution,
	fetchNewBoard,
	setActiveBox,
	setActiveNumber,
	setAnswers,
	setGameOver,
	setNotes,
	setNotesMode,
	setDifficulty,
	setGameOverAnimation,
} from '../actions/board'

export interface BoardState {
	activeBox?: [number, number]
	activeNumber: number
	answers: Answers
	board?: Board
	difficulty?: string
	gameOver: boolean
	gameOverAnimation: boolean
	notes: Notes
	notesMode: boolean
	solution?: Board
}

const initialState: BoardState = {
	activeNumber: 0,
	answers: {},
	board: undefined,
	gameOver: false,
	gameOverAnimation: false,
	notes: [] as any,
	notesMode: false,
	solution: undefined,
}

export const boardReducer = createReducer(initialState, (builder) => {
	builder

		.addCase(fetchNewBoard.pending, (state) => {
			state.board = undefined
			state.solution = undefined
		})
		.addCase(fetchNewBoard.fulfilled, (state, action) => {
			state.board = action.payload[0]
			state.solution = action.payload[1]
		})

		.addCase(setActiveBox, (state, action) => {
			state.activeBox = action.payload
		})

		.addCase(setActiveNumber, (state, action) => {
			state.activeNumber = action.payload
		})

		.addCase(setAnswers, (state, action) => {
			state.answers = action.payload
		})

		.addCase(setBoard, (state, action) => {
			state.board = action.payload
		})

		.addCase(setGameOver, (state, action) => {
			state.gameOver = action.payload
		})
		.addCase(setGameOverAnimation, (state, action) => {
			state.gameOverAnimation = action.payload
		})

		.addCase(setNotes, (state, action) => {
			state.notes = action.payload
		})

		.addCase(setNotesMode, (state, action) => {
			state.notesMode = action.payload
		})

		.addCase(setSolution, (state, action) => {
			state.solution = action.payload
		})

		.addCase(setDifficulty, (state, action) => {
			state.difficulty = action.payload
		})
})
