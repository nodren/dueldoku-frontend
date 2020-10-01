import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useClickAway } from 'react-use'
import { Button, Header, Loader } from 'semantic-ui-react'

import { Board } from '../components/Board'
import { Grid } from '../components/Grid'
import { MultiplayerControls } from '../components/MultiplayerControls'
import { Scores } from '../components/Scores'
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

	const ref = useRef(null)
	useClickAway(ref, () => {
		actions.setActiveBox()
		actions.setActiveNumber(0)
	})

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
					<div ref={ref}>
						<Board />
						<MultiplayerControls />
					</div>
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
			</div>
		</>
	)
}
