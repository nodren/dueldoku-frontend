import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

import { Grid } from '../components/Grid'
import { useActions } from '../hooks/redux'
import { setGameOver } from '../redux/actions/board'
import { getDarkMode } from '../redux/selectors/settings'

export const Home: FC = () => {
	const dark = useSelector(getDarkMode)
	const actions = useActions({
		setGameOver,
	})

	useEffect(() => {
		actions.setGameOver(false)
	}, [])

	return (
		<Grid rows="auto 1fr auto 1fr auto 1fr" height="100%">
			<Header as="h4" inverted={dark} textAlign="center">
				Start your game
			</Header>
			<div>&nbsp;</div>
			<Button as={Link} to="/play/choose">
				Single Player
			</Button>
			<div>&nbsp;</div>
			<Button as={Link} to="/wait/choose">
				Two Player
			</Button>
			<div>&nbsp;</div>
		</Grid>
	)
}
