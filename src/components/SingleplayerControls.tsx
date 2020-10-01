import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { cloneDeep, isEqual } from 'lodash'

import { useActions } from '../hooks/redux'
import { setActiveBox, setAnswers, setBoard, setGameOver, setNotes } from '../redux/actions/board'
import { getActiveBox, getAnswers, getBoard, getNotes, getSolution } from '../redux/selectors/board'
import { Controls } from './Controls'
import { checkAndClearNotes } from '../utils'

export const SingleplayerControls: FC = () => {
	const activeBox = useSelector(getActiveBox)
	const board = useSelector(getBoard)
	const solution = useSelector(getSolution)
	const answers = useSelector(getAnswers)
	const notes = useSelector(getNotes)

	const actions = useActions({
		setActiveBox,
		setAnswers,
		setBoard,
		setGameOver,
		setNotes,
	})

	const onNumberClick = (number: number) => {
		const modifiedBoard = cloneDeep(board)
		const modifiedAnswers = cloneDeep(answers)
		modifiedBoard[activeBox[1]][activeBox[0]] = number
		modifiedAnswers[`${activeBox[0]}:${activeBox[1]}`] = 'you'
		actions.setBoard(modifiedBoard)
		actions.setAnswers(modifiedAnswers)
		const modifiedNotes = checkAndClearNotes(notes, activeBox[1], activeBox[0], number)
		actions.setNotes(modifiedNotes)
		if (isEqual(modifiedBoard, solution)) {
			actions.setGameOver(true)
		}
	}

	const onHintClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		const modifiedBoard = cloneDeep(board)
		modifiedBoard[activeBox[1]][activeBox[0]] = solutionSquare
		actions.setBoard(modifiedBoard)
	}

	const onEraseClick = () => {
		const modifiedBoard = cloneDeep(board)
		modifiedBoard[activeBox[1]][activeBox[0]] = 0
		actions.setBoard(modifiedBoard)
	}

	return (
		<Controls onNumber={onNumberClick} onHint={onHintClick} onErase={onEraseClick} singleMode />
	)
}
