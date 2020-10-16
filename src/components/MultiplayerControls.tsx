import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../hooks/redux'
import useSocket from '../hooks/useSocket'
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
import { setScores } from '../redux/actions/scores'
import { getActiveBox, getNotes, getSolution } from '../redux/selectors/board'
import { getUuid } from '../redux/selectors/settings'
import { getSocket } from '../socket'
import { Board } from '../types'
import { checkAndClearNotes, formatAnswers, wait } from '../utils'
import { Controls } from './Controls'

const socket = getSocket()

interface UpdateProps {
	board: Board
	answers?: Record<string, string>
	scores: Record<string, number>
	activeBox?: [number, number]
	number?: number
}

export const MultiplayerControls: FC = () => {
	const activeBox = useSelector(getActiveBox)
	const uuid = useSelector(getUuid)
	const solution = useSelector(getSolution)
	const notes = useSelector(getNotes)

	const actions = useActions({
		setActiveBox,
		setAnswers,
		setBoard,
		setGameOver,
		setScores,
		setNotes,
		setSolution,
		setDifficulty,
		setGameOverAnimation,
	})

	useSocket('update', ({ board, answers, scores, activeBox, number }: UpdateProps) => {
		actions.setBoard(board)
		if (scores) {
			actions.setScores(scores)
		}

		if (activeBox && number) {
			const boardSquare = board[activeBox[1]][activeBox[0]]
			const solutionSquare = solution[activeBox[1]][activeBox[0]]
			if (boardSquare === solutionSquare) {
				// we had an update, and it's a correct guess, let's clear out some notes
				const modifiedNotes = checkAndClearNotes(notes, activeBox[1], activeBox[0], number)
				actions.setNotes(modifiedNotes)
			}
		}
		if (answers) {
			actions.setAnswers(formatAnswers(answers, socket.id))
		}
	})
	useSocket('gameover', async (board: Board) => {
		actions.setGameOverAnimation(true)
		await wait(3400)
		actions.setGameOverAnimation(false)
		actions.setGameOver(true)
		actions.setBoard()
		actions.setSolution()
		actions.setAnswers({})
		actions.setNotes([] as any)
		actions.setDifficulty('')
	})

	const onNumberClick = (number: number, box: [number, number]) => {
		socket.emit('guess', { id: uuid, activeBox: box, number })
	}

	const onHintClick = () => {
		socket.emit('hint', { id: uuid, activeBox })
	}
	const onEraseClick = () => {
		socket.emit('erase', { id: uuid, activeBox })
	}

	return <Controls onNumber={onNumberClick} onHint={onHintClick} onErase={onEraseClick} />
}
