import Link from 'next/link'
import { Button, Header } from 'semantic-ui-react'

import { useTheme } from '../hooks/useDarkMode'

export default function Home() {
	const { dark } = useTheme()

	return (
		<>
			<Header as="h4" inverted={dark} textAlign="center">
				Start your game
			</Header>
			<Button.Group vertical>
				<Link href="/play/choose">
					<Button>Single Player</Button>
				</Link>
				<Link href="/wait/choose">
					<Button>Two Player</Button>
				</Link>
			</Button.Group>
		</>
	)
}
