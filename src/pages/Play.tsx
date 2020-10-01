import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Loader } from 'semantic-ui-react'

import { Board } from '../components/Board'
import { Grid } from '../components/Grid'
import { MultiplayerControls } from '../components/MultiplayerControls'
import { Scores } from '../components/Scores'
import { useActions } from '../hooks/redux'
import { fetchNewBoard, setBoard, setSolution } from '../redux/actions/board'
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
			{gameOver ? (
				<Grid rows="auto auto auto">
					<div className="game-over">Game over!</div>
					<Scores />
					<Button as={Link} to="/" primary>
						Play Again
					</Button>
				</Grid>
			) : null}
		</>
	)
}
