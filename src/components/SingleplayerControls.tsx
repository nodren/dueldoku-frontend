import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'

import { useActions } from '../hooks/redux'
import { setActiveBox, setAnswers, setBoard, setGameOver } from '../redux/actions/board'
import { getActiveBox, getAnswers, getBoard, getSolution } from '../redux/selectors/board'
import { Controls } from './Controls'

export const SingleplayerControls: FC = () => {
	const activeBox = useSelector(getActiveBox)
	const board = useSelector(getBoard)
	const solution = useSelector(getSolution)
	const answers = useSelector(getAnswers)

	const actions = useActions({
		setActiveBox,
		setAnswers,
		setBoard,
		setGameOver,
	})

	// useSocket('update', ({ board, answers, scores }: UpdateProps) => {
	// 	console.log('update', scores, socket.id)
	// 	actions.setBoard(board)
	// 	actions.setScores(scores)
	// 	// refresh the board, react isn't handling a deep object update well
	// 	// const oldActive = [...activeBox]
	// 	// actions.setActiveBox([0, 0])
	// 	// actions.setActiveBox(oldActive as any)
	// 	if (answers) {
	// 		actions.setAnswers(formatAnswers(answers, socket.id))
	// 	}
	// })

	const onNumberClick = (number: number) => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		const modifiedBoard = cloneDeep(board)
		const modifiedAnswers = cloneDeep(answers)
		modifiedBoard[activeBox[1]][activeBox[0]] = number
		modifiedAnswers[`${activeBox[0]}:${activeBox[1]}`] = 'you'
		actions.setBoard(modifiedBoard)
		actions.setAnswers(modifiedAnswers)
		// useSocket('gameover', (board: Board) => {
		// 	actions.setGameOver(true)
		// })
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
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]

		if (boardSquare === solutionSquare) {
			return
		}
		const modifiedBoard = cloneDeep(board)
		modifiedBoard[activeBox[1]][activeBox[0]] = 0
		actions.setBoard(modifiedBoard)
	}

	return (
		<Controls onNumber={onNumberClick} onHint={onHintClick} onErase={onEraseClick} noScores />
	)
}
