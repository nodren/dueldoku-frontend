import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

import { getDarkMode } from '../redux/selectors/settings'

export const MultiChoose: FC = () => {
	const dark = useSelector(getDarkMode)

	return (
		<>
			<Header as="h4" inverted={dark} textAlign="center">
				Choose difficulty
			</Header>
			<Button.Group vertical>
				<Button as={Link} to="/wait/easy">
					Easy
				</Button>
				<Button as={Link} to="/wait/medium">
					Medium
				</Button>
				<Button as={Link} to="/wait/hard">
					Hard
				</Button>
			</Button.Group>
		</>
	)
}
