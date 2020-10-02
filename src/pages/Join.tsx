import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Loader } from 'semantic-ui-react'

import { Board } from '../components/Board'
import { GameOver } from '../components/GameOver'
import { MultiplayerControls } from '../components/MultiplayerControls'
import { useActions } from '../hooks/redux'
import useSocket from '../hooks/useSocket'
import { setActiveBox, setActiveNumber, setBoard, setSolution } from '../redux/actions/board'
import { setUuid } from '../redux/actions/settings'
import { getBoard, getGameOver } from '../redux/selectors/board'
import { getDarkMode } from '../redux/selectors/settings'

export const Join: FC = () => {
	const dark = useSelector(getDarkMode)
	const board = useSelector(getBoard)
	const gameOver = useSelector(getGameOver)
	const actions = useActions({
		setBoard,
		setSolution,
		setUuid,
		setActiveBox,
		setActiveNumber,
	})
	const [loading, setLoading] = useState(true)

	const params = useParams<{ uuid: string }>()

	const socket = useSocket('ready', (data) => {
		actions.setBoard(data.board)
		actions.setSolution(data.solution)
		setLoading(false)
	})

	useEffect(() => {
		;(async () => {
			if (params.uuid) {
				actions.setUuid(params.uuid)
				socket.emit('start', params.uuid)
			}
		})()
	}, [params.uuid])

	return (
		<>
			<style jsx>{`
				.start {
					text-align: center;
				}
				.game-over {
					text-align: center;
					height: 20rem;
					line-height: 20rem;
					font-size: 36px;
				}
			`}</style>
			<div className="start">
				{loading && (
					<>
						<Header as="h2" inverted={dark}>
							Waiting room
						</Header>
						<p>Waiting for opponent</p>
					</>
				)}
				<Loader active={loading} />
				{!loading && board && !gameOver ? (
					<>
						<Board />
						<MultiplayerControls />
					</>
				) : null}
				{gameOver ? <GameOver /> : null}
			</div>
		</>
	)
}
