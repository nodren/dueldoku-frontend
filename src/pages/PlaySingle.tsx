import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import { Board } from '../components/Board'
import { GameOver } from '../components/GameOver'
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
					<SingleplayerControls />
				</>
			) : null}
			{gameOver ? <GameOver singleMode /> : null}
		</>
	)
}
