import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

import { getScores } from '../redux/selectors/scores'
import { getDarkMode } from '../redux/selectors/settings'
import { getSocket } from '../socket'
import { processScores } from '../utils'
import { Grid } from './Grid'
import { ScoresTable } from './Scores'

const socket = getSocket()

export const GameOver: FC = () => {
	const dark = useSelector(getDarkMode)
	const scores = processScores(useSelector(getScores))
	const message = scores[0].id === socket.id ? 'You win!' : 'Game Over!'

	return (
		<Grid rows="auto auto auto">
			<Header as="h1" inverted={dark}>
				{message}
			</Header>
			<ScoresTable />
			<Button as={Link} to="/" primary>
				Play Again
			</Button>
		</Grid>
	)
}

export const SingleGameOver: FC = () => {
	const dark = useSelector(getDarkMode)
	const scores = useSelector(getScores)

	const you = processScores(scores).find((s) => s.id === 'you')

	return (
		<Grid rows="auto auto 1fr auto">
			<Header as="h1" inverted={dark}>
				Nice job!
			</Header>
			<div>Final score: {you?.score}</div>
			<div>&nbsp;</div>
			<Button as={Link} to="/" primary>
				Play Again
			</Button>
		</Grid>
	)
}
