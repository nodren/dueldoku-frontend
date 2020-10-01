import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Loader } from 'semantic-ui-react'
import { useClickAway } from 'react-use'

import { Board } from '../components/Board'
import { Grid } from '../components/Grid'
import { SingleplayerControls } from '../components/SingleplayerControls'
import { useActions } from '../hooks/redux'
import { fetchNewBoard, setActiveBox, setActiveNumber } from '../redux/actions/board'
import { getBoard, getGameOver, getSolution } from '../redux/selectors/board'

export const PlaySingle: FC = () => {
	const board = useSelector(getBoard)
	const solution = useSelector(getSolution)
	const gameOver = useSelector(getGameOver)
	const [loading, setLoading] = useState(true)

	const actions = useActions({
		fetchNewBoard,
		setActiveBox,
		setActiveNumber,
	})

	const params = useParams<{ mode: string }>()
	useEffect(() => {
		actions.fetchNewBoard(params.mode)
	}, [])

	useEffect(() => {
		if (solution) {
			setLoading(false)
		}
	}, [solution])

	const ref = useRef(null)
	useClickAway(ref, () => {
		actions.setActiveBox()
		actions.setActiveNumber(0)
	})

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
				<div ref={ref}>
					<Board />
					<SingleplayerControls />
				</div>
			) : null}
			{gameOver ? (
				<Grid rows="auto auto auto">
					<div className="game-over">You win over!</div>
					<Button as={Link} to="/" primary>
						Play Again
					</Button>
				</Grid>
			) : null}
		</>
	)
}
