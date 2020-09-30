import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Header, Loader } from 'semantic-ui-react'

import { Board } from '../../components/Board'
import { Grid } from '../../components/Grid'
import { MultiplayerControls } from '../../components/MultiplayerControls'
import { Scores } from '../../components/Scores'
import { useActions } from '../../hooks/redux'
import { useTheme } from '../../hooks/useDarkMode'
import useSocket from '../../hooks/useSocket'
import { setBoard, setSolution } from '../../redux/actions/board'
import { setUuid } from '../../redux/actions/settings'
import { getBoard, getGameOver } from '../../redux/selectors/board'

export default function Home() {
	const { dark } = useTheme()
	const board = useSelector(getBoard)
	const gameOver = useSelector(getGameOver)
	const actions = useActions({
		setBoard,
		setSolution,
		setUuid,
	})
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	const socket = useSocket('ready', (data) => {
		actions.setBoard(data.board)
		actions.setSolution(data.solution)
		setLoading(false)
	})

	useEffect(() => {
		;(async () => {
			if (router.query.uuid) {
				actions.setUuid(router.query.uuid as string)
				console.log('START', router.query.uuid)
				socket.emit('start', router.query.uuid)
			}
		})()
	}, [router.query.uuid])

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
				{gameOver ? (
					<Grid rows="auto auto auto">
						<div className="game-over">Game over!</div>
						<Scores />
						<Link href="/">
							<a>
								<Button primary>Play Again</Button>
							</a>
						</Link>
					</Grid>
				) : null}
			</div>
		</>
	)
}
