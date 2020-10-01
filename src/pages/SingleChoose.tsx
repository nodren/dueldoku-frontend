import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

import { getDarkMode } from '../redux/selectors/settings'

export const SingleChoose: FC = () => {
	const dark = useSelector(getDarkMode)

	return (
		<>
			<Header as="h4" inverted={dark} textAlign="center">
				Choose difficulty
			</Header>
			<Button.Group vertical>
				<Button as={Link} to="/play/single/easy">
					Easy
				</Button>
				<Button as={Link} to="/play/single/medium">
					Medium
				</Button>
				<Button as={Link} to="/play/single/hard">
					Hard
				</Button>
				<Button as={Link} to="/play/single/expert">
					Expert
				</Button>
			</Button.Group>
		</>
	)
}
