import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { getScores } from '../redux/selectors/multiplayer'
import { getSocket } from '../socket'
import { Grid } from './Grid'
import { Scores } from './Scores'
import { processScores } from '../utils'

const socket = getSocket()

interface Props {
	singleMode?: boolean
}
export const GameOver: FC<Props> = ({ singleMode }) => {
	const scores = processScores(useSelector(getScores))
	const message = singleMode ? 'You win!' : scores[0].id === socket.id ? 'You win!' : 'Game Over!'

	return (
		<Grid rows="auto auto auto">
			<div className="game-over">{message}</div>
			{!singleMode && <Scores />}
			<Button as={Link} to="/" primary>
				Play Again
			</Button>
		</Grid>
	)
}
