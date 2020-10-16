import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { cloneDeep, isEqual } from 'lodash'

import { useActions } from '../hooks/redux'
import {
	setActiveBox,
	setAnswers,
	setBoard,
	setDifficulty,
	setGameOver,
	setNotes,
	setSolution,
	setGameOverAnimation,
} from '../redux/actions/board'
import { getActiveBox, getAnswers, getBoard, getNotes, getSolution } from '../redux/selectors/board'
import { Controls } from './Controls'
import { checkAndClearNotes, wait } from '../utils'
import { getScores } from '../redux/selectors/scores'
import { setScores } from '../redux/actions/scores'
import { calculateScore } from '../utils/score'
import { getValidateAnswers } from '../redux/selectors/settings'

export const SingleplayerControls: FC = () => {
	const activeBox = useSelector(getActiveBox)
	const board = useSelector(getBoard)
	const solution = useSelector(getSolution)
	const answers = useSelector(getAnswers)
	const notes = useSelector(getNotes)
	const scores = useSelector(getScores)
	const validateAnswers = useSelector(getValidateAnswers)

	const actions = useActions({
		setActiveBox,
		setAnswers,
		setBoard,
		setGameOver,
		setNotes,
		setSolution,
		setDifficulty,
		setScores,
		setGameOverAnimation,
	})

	const onNumberClick = async (number: number, box: [number, number]) => {
		const modifiedBoard = cloneDeep(board)
		const modifiedAnswers = cloneDeep(answers)
		modifiedBoard[box[1]][box[0]] = number
		modifiedAnswers[`${box[0]}:${box[1]}`] = 'you'
		actions.setBoard(modifiedBoard)
		actions.setAnswers(modifiedAnswers)
		const modifiedNotes = checkAndClearNotes(notes, box[1], box[0], number)
		actions.setNotes(modifiedNotes)
		const modifiedScores = cloneDeep(scores)
		modifiedScores['you'] =
			(scores?.you || 0) +
			calculateScore(modifiedBoard, solution, box, number, validateAnswers)
		actions.setScores(modifiedScores)
		if (isEqual(modifiedBoard, solution)) {
			actions.setGameOverAnimation(true)
			//wait 5 seconds, then game over
			await wait(3400)
			actions.setGameOverAnimation(false)
			actions.setGameOver(true)
			actions.setBoard()
			actions.setSolution()
			actions.setAnswers({})
			actions.setNotes([] as any)
			actions.setDifficulty('')
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
		const modifiedNotes = checkAndClearNotes(notes, activeBox[1], activeBox[0], solutionSquare)
		actions.setNotes(modifiedNotes)
		const modifiedScores = cloneDeep(scores)
		modifiedScores['you'] = (scores?.you || 0) - 50
		actions.setScores(modifiedScores)
		if (isEqual(modifiedBoard, solution)) {
			actions.setGameOver(true)
			actions.setBoard()
			actions.setSolution()
			actions.setAnswers({})
			actions.setNotes([] as any)
		}
	}

	const onEraseClick = () => {
		const number = board[activeBox[1]][activeBox[0]]
		const modifiedScores = cloneDeep(scores)
		modifiedScores['you'] =
			(scores?.you || 0) - calculateScore(board, solution, activeBox, number, validateAnswers)
		actions.setScores(modifiedScores)
		const modifiedBoard = cloneDeep(board)
		modifiedBoard[activeBox[1]][activeBox[0]] = 0
		actions.setBoard(modifiedBoard)
	}

	return (
		<Controls onNumber={onNumberClick} onHint={onHintClick} onErase={onEraseClick} singleMode />
	)
}
