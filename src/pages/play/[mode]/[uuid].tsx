import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Loader } from 'semantic-ui-react'

import { Board } from '../../../components/Board'
import { Grid } from '../../../components/Grid'
import { MultiplayerControls } from '../../../components/MultiplayerControls'
import { Scores } from '../../../components/Scores'
import { useActions } from '../../../hooks/redux'
import { setBoard, setSolution } from '../../../redux/actions/board'
import { setUuid } from '../../../redux/actions/settings'
import { getBoard, getGameOver } from '../../../redux/selectors/board'
import { getSocket } from '../../../socket'

const socket = getSocket()

export default function Home() {
	const board = useSelector(getBoard)
	const gameOver = useSelector(getGameOver)
	const actions = useActions({
		setBoard,
		setSolution,
		setUuid,
	})
	const [loading, setLoading] = useState(true)

	const { query } = useRouter()

	useEffect(() => {
		;(async () => {
			if (!query.uuid) {
				return
			}
			const puzzle = await axios.get(`/api/generate/${query.mode}`)
			actions.setUuid(query.uuid as string)
			console.log('START 2', query.uuid)
			socket.emit('start', query.uuid)
			setTimeout(() => {
				socket.emit('ready', query.uuid as string, {
					mode: query.mode,
					board: puzzle.data.puzzle,
					solution: puzzle.data.solution,
				})
				actions.setSolution(puzzle.data.solution)
				actions.setBoard(puzzle.data.puzzle)
				setLoading(false)
			}, 250)
		})()
	}, [query.uuid])

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
					<Link href="/">
						<a>
							<Button primary>Play Again</Button>
						</a>
					</Link>
				</Grid>
			) : null}
		</>
	)
}
