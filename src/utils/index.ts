import { cloneDeep, isEqual } from 'lodash'

import { Answers, Board, Notes, Score } from '../types'

export function processScores(scores: Record<string, number>): [Score, Score] {
	if (!scores) {
		return [] as any
	}
	const ret: any = Object.entries(scores).map(([id, score]) => {
		return {
			id,
			score,
		}
	})
	ret.sort((scoreA: Score, scoreB: Score) => {
		return scoreB.score - scoreA.score
	})
	return ret
}

export function formatAnswers(answers: Record<string, string>, id: string): Answers {
	const formattedAnswers: Answers = {}
	for (const [box, playerId] of Object.entries(answers)) {
		if (playerId === id) {
			formattedAnswers[box] = 'you'
		} else {
			formattedAnswers[box] = 'opponent'
		}
	}
	return formattedAnswers
}

export function countNumberOnBoard(board: Board, number: number) {
	const boardStr = convertBoardToString(board)
	return boardStr.split(number.toString()).length - 1
}

export function convertBoardToString(board: Board) {
	const boardRows = []
	for (const row of board) {
		boardRows.push(row.join(''))
	}
	return boardRows.join('')
}

export const isError = (
	rowNum: number,
	colNum: number,
	board: Board,
	solution: Board,
	validateAnswer?: boolean,
) => {
	const square = board[rowNum][colNum]
	if (square === 0) {
		return false
	}
	// if user wants errors on any invalid guess, check that(cheap)
	if (validateAnswer) {
		const solutionSquare = solution[rowNum][colNum]
		return square !== 0 && square !== solutionSquare
	}
	// this is if the user doesn't want wrong guesses to be told unless they break the rules
	const guessBoard = cloneDeep(board)
	guessBoard[rowNum][colNum] = 0
	// no solution provided, check based on game rules
	// row
	const row = guessBoard[rowNum]
	if (row.includes(square)) {
		return true
	}
	// column
	const foundColumn = guessBoard.find((row) => row[colNum] === square)
	if (foundColumn) {
		return true
	}
	// box
	return numUsedInBox(guessBoard, rowNum, colNum, square)
}

export function getBoxCoords(row: number, column: number): [number, number] {
	const x = Math.floor(column / 3)
	const y = Math.floor(row / 3)
	return [x, y]
}

export const numUsedInBox = (board: Board, row: number, col: number, number: number) => {
	const currentCoords = getBoxCoords(row, col)
	for (const [rowIdx, row] of board.entries()) {
		for (const [colIdx, col] of row.entries()) {
			if (isEqual(currentCoords, getBoxCoords(rowIdx, colIdx))) {
				if (col === number) {
					return true
				}
			}
		}
	}
	return false
}

export function checkAndClearNotes(notes: Notes, row: number, col: number, number: number) {
	const editedNotes = cloneDeep(notes)
	//clear out the row
	const noteRow = editedNotes?.[row]
	if (noteRow) {
		for (const [colNum, noteBox] of noteRow.entries()) {
			if (noteBox?.[number]) {
				editedNotes[row][colNum][number] = false
			}
		}
	}
	//clear out the column
	for (const [rowNum, noteRow] of editedNotes.entries()) {
		if (noteRow?.[col]?.[number]) {
			editedNotes[rowNum][col][number] = false
		}
	}
	//now the box
	const activeBoxCoords = getBoxCoords(row, col)
	for (const [rowNum, noteRow] of editedNotes.entries()) {
		if (noteRow) {
			for (const [colNum, noteBox] of noteRow.entries()) {
				const boxCoords = getBoxCoords(rowNum, colNum)
				if (isEqual(boxCoords, activeBoxCoords) && noteBox?.[number]) {
					editedNotes[rowNum][colNum][number] = false
				}
			}
		}
	}
	return editedNotes
}
