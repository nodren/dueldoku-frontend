import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

import { Grid } from '../components/Grid'
import { getDarkMode } from '../redux/selectors/settings'

export const MultiChoose: FC = () => {
	const dark = useSelector(getDarkMode)

	return (
		<Grid rows="auto 1fr auto 1fr auto 1fr auto 1fr" height="100%">
			<Header as="h4" inverted={dark} textAlign="center">
				Choose difficulty
			</Header>
			<div>&nbsp;</div>
			<Button as={Link} to="/wait/easy">
				Easy
			</Button>
			<div>&nbsp;</div>
			<Button as={Link} to="/wait/medium">
				Medium
			</Button>
			<div>&nbsp;</div>
			<Button as={Link} to="/wait/hard">
				Hard
			</Button>
			<div>&nbsp;</div>
		</Grid>
	)
}
