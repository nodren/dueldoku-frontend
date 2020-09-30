import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../hooks/redux'
import { setActiveBox, setAnswers, setBoard, setGameOver } from '../redux/actions/board'
import { getActiveBox } from '../redux/selectors/board'
import { Controls } from './Controls'

export const MultiplayerControls: FC = () => {
	const activeBox = useSelector(getActiveBox)

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
		// useSocket('gameover', (board: Board) => {
		// 	actions.setGameOver(true)
		// })
	}

	const onHintClick = () => {}

	const onEraseClick = () => {}

	return <Controls onNumber={onNumberClick} onHint={onHintClick} onErase={onEraseClick} />
}
