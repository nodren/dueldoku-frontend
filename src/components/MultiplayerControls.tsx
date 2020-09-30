import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../hooks/redux'
import useSocket from '../hooks/useSocket'
import { setActiveBox, setAnswers, setBoard, setGameOver } from '../redux/actions/board'
import { setScores } from '../redux/actions/multiplayer'
import { getActiveBox } from '../redux/selectors/board'
import { getUuid } from '../redux/selectors/settings'
import { getSocket } from '../socket'
import { Board } from '../types'
import { formatAnswers } from '../utils'
import { Controls } from './Controls'

const socket = getSocket()

interface UpdateProps {
	board: Board
	answers?: Record<string, string>
	scores: Record<string, number>
}

export const MultiplayerControls: FC = () => {
	const activeBox = useSelector(getActiveBox)
	const uuid = useSelector(getUuid)

	const actions = useActions({
		setActiveBox,
		setAnswers,
		setBoard,
		setGameOver,
		setScores,
	})

	useSocket('update', ({ board, answers, scores }: UpdateProps) => {
		console.log('update', scores, socket.id)
		actions.setBoard(board)
		actions.setScores(scores)
		// refresh the board, react isn't handling a deep object update well
		// const oldActive = [...activeBox]
		// actions.setActiveBox([0, 0])
		// actions.setActiveBox(oldActive as any)
		if (answers) {
			actions.setAnswers(formatAnswers(answers, socket.id))
		}
	})
	useSocket('gameover', (board: Board) => {
		actions.setGameOver(true)
	})

	const onNumberClick = (number: number) => {
		socket.emit('guess', uuid, { activeBox, number })
	}

	const onHintClick = () => {
		socket.emit('hint', uuid, { activeBox })
	}
	const onEraseClick = () => {
		socket.emit('erase', uuid, { activeBox })
	}

	return <Controls onNumber={onNumberClick} onHint={onHintClick} onErase={onEraseClick} />
}
