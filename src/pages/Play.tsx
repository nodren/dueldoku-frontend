import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import { Board } from '../components/Board'
import { GameOver } from '../components/GameOver'
import { MultiplayerControls } from '../components/MultiplayerControls'
import { useActions } from '../hooks/redux'
import {
	fetchNewBoard,
	setActiveBox,
	setActiveNumber,
	setBoard,
	setSolution,
} from '../redux/actions/board'
import { setUuid } from '../redux/actions/settings'
import { getBoard, getGameOver, getSolution } from '../redux/selectors/board'
import { getSocket } from '../socket'

const socket = getSocket()

export const Play: FC = () => {
	const board = useSelector(getBoard)
	const solution = useSelector(getSolution)
	const gameOver = useSelector(getGameOver)
	const actions = useActions({
		setBoard,
		setSolution,
		setUuid,
		fetchNewBoard,
		setActiveBox,
		setActiveNumber,
	})
	const [loading, setLoading] = useState(true)

	const params = useParams<{ uuid: string; mode: string }>()

	useEffect(() => {
		actions.fetchNewBoard(params.mode)
		actions.setUuid(params.uuid)
		socket.emit('start', params.uuid)
	}, [])

	useEffect(() => {
		if (solution) {
			socket.emit('ready', {
				id: params.uuid,
				mode: params.mode,
				board,
				solution,
			})
			setLoading(false)
		}
	}, [solution])

	return (
		<>
			<style jsx>{`
				.game-over {
					text-align: center;
					height: 20rem;
					line-height: 20rem;
					font-size: 36px;
				}
			`}</style>
			<Loader active={loading} />
			{!loading && board && !gameOver ? (
				<>
					<Board />
					<MultiplayerControls />
				</>
			) : null}
			{gameOver ? <GameOver /> : null}
		</>
	)
}
